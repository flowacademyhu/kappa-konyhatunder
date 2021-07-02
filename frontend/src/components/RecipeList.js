import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import picture from '../images/avocado.jpeg';
import styled from 'styled-components';
const recipeAPI = axios.create({
  baseURL: '/api/',
});

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 250px;
`;

function RecipeList() {
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    async function getRecipeList() {
      try {
        const response = await recipeAPI.get('recipes');
        setRecipes(response.data);
      } catch (err) {
        console.error('Error during api call:', err);
      }
    }
    getRecipeList();
  }, []);

  return (
    <div className="container">
      <div className="card-deck">
        {recipes ? (
          <>
            {recipes.map((recipe) => (
              <div key={recipe.id} className="col-4 my-3">
                <div className="card">
                  <StyledImage
                    className="card-img-top"
                    src={picture}
                    alt={recipe.title}
                  />
                  <div className="card-body">
                    <Link
                      className="card-title"
                      to={`/recipes/${recipe.id}`}
                      key={recipe.id}
                    >
                      {recipe.name}
                    </Link>
                    <div className="card-text">{recipe.description}</div>
                  </div>
                </div>
              </div>
            ))}{' '}
          </>
        ) : (
          <div>'Loading List...' </div>
        )}
      </div>
    </div>
  );
}

export default RecipeList;
