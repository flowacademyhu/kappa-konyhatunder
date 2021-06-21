import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const recipeAPI = axios.create({
  baseURL: '/api/',
});

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
      {recipes ? (
        recipes.map((recipe) => (
          <ul className="list-group" key={recipe.id}>
            <li className="list-group-item list-group-item-action">
              <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                {recipe.name}
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <div>'Loading List...' </div>
      )}
    </>
  );
}

export default RecipeList;
