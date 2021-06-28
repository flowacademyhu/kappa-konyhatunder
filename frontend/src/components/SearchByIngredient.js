import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const recipeAPI = axios.create({
  baseURL: '/api/',
});

function SearchByIngredient() {
  const [recipes, setRecipes] = useState('');
  const [ingredientsList, setIngredientsList] = useState();
  const [ertek, setErtek] = useState();
  const [ertekTomb, setErtekTomb] = useState([]);

  useEffect(() => {
    async function getRecipeList() {
      try {
        const response = await recipeAPI.get('recipes');
        setRecipes(response.data);
        console.log(response);
      } catch (err) {
        console.error('Error during api call:', err);
      }
    }
    getRecipeList();
  }, []);

  useEffect(() => {
    async function ingredientFunction() {
      try {
        const response = await axios.get(`/api/ingredients`);

        setIngredientsList(response.data);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
    ingredientFunction();
  }, []);

  return (
    <>
      {ingredientsList ? (
        <div className="col-4">
          <p>hozzávaló</p>
          <select
            className="form-control"
            name="ingredient"
            id="data"
            onChange={(e) => {
              setErtek(e.target.value);
              console.log(ertek);
            }}
          >
            {ingredientsList.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>

          <div className="col">
            <p>Gomb</p>
            <button
              className="btn btn-success"
              data-toggle="modal"
              data-target="#ringredientStatusModal"
              onClick={() => {
                setErtekTomb([...ertekTomb, ertek]);
                console.log('A lista', ertekTomb);
                recipes.filter((recipe) => recipe.ingredient.id);
              }}
              type="button"
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <div>'Loading List...' </div>
      )}{' '}
      {recipes ? (
        recipes.map((recipe) => (
          <div className="col">Recept neve : {recipe.name}</div>
        ))
      ) : (
        <div>'Loading List...' </div>
      )}
      <Link className="btn btn-primary" to="/searchResult">
        Keresés...
      </Link>
    </>
  );
}

export default SearchByIngredient;
