import { getMostRecommendedRecipes } from './components/apiCalls';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SmallImage = styled.img`
  object-fit: cover;
  height: 217.8px;
`;

function BodyPart() {
  const [recipeList, setRecipeList] = useState([]);
  useEffect(() => {
    const getInitData = async () => {
      try {
        setRecipeList(await getMostRecommendedRecipes());
      } catch (error) {
        console.error(error);
      }
    };
    getInitData();
  }, []);
  return (
    <>
      <div className="card-deck">
        <div className="card-deck " style={{ margin: '30px' }}>
          {recipeList
            .map((recipe) => (
              <Link
                className="card "
                style={{ width: '100%', textDecoration: 'none' }}
                to={{
                  pathname: `/recipes/${recipe.id}`,
                  state: { ingredient: null },
                }}
                key={recipe.id}
              >
                <img
                  className="card-img-top"
                  src={`/api/image/${recipe.image.id}`}
                  alt={`${recipe.image.id}`}
                  style={{ objectFit: 'cover', height: 550 }}
                />
                <div className="card-body" style={{ textDecoration: 'none' }}>
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">
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
                className="card"
                style={{
                  width: '100%',
                  overflow: 'hidden',
                  textDecoration: 'none',
                }}
                to={{
                  pathname: `/recipes/${recipe.id}`,
                  state: { ingredient: null },
                }}
                key={recipe.id}
              >
                <SmallImage
                  className="card-img-top"
                  src={`/api/image/${recipe.image.id}`}
                  alt={`${recipe.image.id}`}
                />
                <div className="card-body" style={{ textDecoration: 'none' }}>
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">
                    {recipe.description.length > 33
                      ? recipe.description.substring(0, 100) + '...'
                      : recipe.description}
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
