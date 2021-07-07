import { getMostRecommendedRecipes } from './components/apiCalls';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BodyPart() {
  const [recipeList, setRecipeList] = useState([]);
  useEffect(() => {
    const getInitData = async () => {
      setRecipeList(await getMostRecommendedRecipes());
    };
    getInitData();
  }, []);
  console.log(recipeList);
  return (
    <>
      <div className="card-deck">
        <div className="card-deck" style={{ margin: '30px' }}>
          {recipeList
            .map((recipe) => (
              <Link
                class="card"
                style={{ width: '100%' }}
                to={{
                  pathname: `/recipes/${recipe.id}`,
                  state: { ingredient: null },
                }}
              >
                <img
                  class="card-img-top"
                  src={`/api/image/${recipe.image.id}`}
                  alt={`${recipe.image.id}`}
                  style={{ objectFit: 'cover', height: 550 }}
                />
                <div class="card-body">
                  <h5 class="card-title">{recipe.name}</h5>
                  <p class="card-text">
                    {' '}
                    {recipe.description.substring(0, 200) + '...'}
                  </p>
                  <p>Ezt a receptet {recipe.recommendations} ember ajánlja</p>
                </div>
              </Link>
            ))
            .slice(0, 2)}
        </div>
        <div className="card-deck" style={{ margin: '30px' }}>
          {recipeList
            .map((recipe) => (
              <Link
                class="card"
                style={{ width: '100%', height: 450 }}
                to={{
                  pathname: `/recipes/${recipe.id}`,
                  state: { ingredient: null },
                }}
              >
                <img
                  class="card-img-top"
                  src={`/api/image/${recipe.image.id}`}
                  alt={`${recipe.image.id}`}
                  style={{ objectFit: 'cover', height: 217.8 }}
                />
                <div class="card-body">
                  <h5 class="card-title">{recipe.name}</h5>
                  <p class="card-text">
                    {' '}
                    {recipe.description.substring(0, 100) + '...'}
                  </p>
                  <p>Ezt a receptet {recipe.recommendations} ember ajánlja</p>
                </div>
              </Link>
            ))
            .slice(2, 7)}
        </div>
      </div>
    </>
  );
}

export default BodyPart;
