import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const recipeAPI = axios.create({
  baseURL: 'http://localhost:8081/api/',
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
    <ul className="list-group">
      {recipes
        ? recipes.map((recipe) => (
            <li className="list-group-item list-group-item-action">
            <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
           
                {recipe.name}
                         </Link>
              </li>
   
          ))
        : 'Loading List...'}
    </ul>
  );
}

export default RecipeList;
