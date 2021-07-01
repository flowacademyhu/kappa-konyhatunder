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
    <>
      <div className="container">
        {recipes ? (
          <ul className="list-group">
            {recipes.map((recipe) => (
              <li key={recipe.id} className="list-group-item">
                <div className="justify-content-between  row m-2">
                  <StyledImage
                    className="col-3"
                    src={picture}
                    alt={recipe.title}
                  />
                  <Link
                    className="col-9"
                    to={`/recipes/${recipe.id}`}
                    key={recipe.id}
                  >
                    {recipe.name}
                  </Link>
                </div>
              </li>
            ))}{' '}
          </ul>
        ) : (
          <div>'Loading List...' </div>
        )}
      </div>
    </>
  );
}

export default RecipeList;
