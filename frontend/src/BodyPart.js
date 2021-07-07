import { getMostRecommendedRecipes } from './components/apiCalls';
import { useEffect, useState } from 'react';

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
              <div className="card">
                <img
                  className="card-img-top"
                  src={`/api/image/${recipe.image.id}`}
                  alt="Kép a receptről"
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">{recipe.description}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      {recipe.recommendations}
                    </small>
                  </p>
                </div>
              </div>
            ))
            .slice(0, 2)}
        </div>
        <div className="card-deck" style={{ margin: '30px' }}>
          {recipeList.map((recipe) => (
            <div className="card">
              <img
                className="card-img-top"
                src={`/api/image/${recipe.image.id}`}
                alt="Kép a receptről"
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.description}</p>
                <p className="card-text">
                  <small className="text-muted">{recipe.recommendations}</small>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BodyPart;
