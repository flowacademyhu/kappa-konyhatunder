import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RecipeList() {
  const [recipes, setRecipes] = useState();

  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/recipes');
      setRecipes(response.data);
    } catch (err) {
      console.error('Error during api call:', err);
    }
  }, []);

  return (
    <ul className="list-group">
      {recipes
        ? recipes.map((p) => (
            <Link to={`/recipes/${p.id}`} key={p.id}>
              <li className="list-group-item list-group-item-action">
                {p.name}
                {p.details}
              </li>
            </Link>
          ))
        : 'Loading List...'}
    </ul>
  );
}

export default RecipeList;
