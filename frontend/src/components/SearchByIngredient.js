import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import IngredientsInRecipeList from './IngredientsInRecipeList';
const recipeAPI = axios.create({
  baseURL: '/api/',
});

function SearchByIngredient() {
  const [recipes, setRecipes] = useState('');
  const [ingredientsList, setIngredientsList] = useState();
  const [ertek, setErtek] = useState('');
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
            <option>Hozzávaló neve</option>
            {ingredientsList.map((l) => (
              <option key={l.id} value={JSON.stringify(l)}>
                {l.name}
              </option>
            ))}
          </select>

          <div className="col">
            <p>Gomb</p>
            <button
              className="btn btn-success"
              onClick={() => {
                setErtekTomb([...ertekTomb, JSON.parse(ertek)]);
                console.log('A lista', ertekTomb);
                console.log(ertek);
                setIngredientsList(
                  ingredientsList.filter(
                    (ingredientItem) =>
                      ingredientItem.id !== JSON.parse(ertek).id
                  )
                );
                //       recipes.filter((recipe) => recipe.ingredient.id);
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
      <Link className="btn btn-primary" to="/searchResult">
        Keresés...
      </Link>
      <>
        {/* */}{' '}
        {ertekTomb ? (
          <div className="container">
            <div>A hozzávalók listája:</div>
            {ertekTomb.map((ingredient) => (
              <div className="row" key={ingredient.id}>
                <div className="col">{ingredient.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>Loading List... </div>
        )}
      </>
    </>
  );
}

export default SearchByIngredient;
