import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getIngredient } from './apiCalls';
function SearchByIngredient() {
  const [ingredientsList, setIngredientsList] = useState();
  const [chosenIngredient, setChosenIngredient] = useState('');
  const [ingredientsArray, setIngredientsArray] = useState([]);

  useEffect(() => {
    const loadingData = async () => {
      setIngredientsList(await getIngredient());
    };
    loadingData();
  }, []);

  return (
    <div className="container mt-4 align-items-center justify-content-between">
      <div className="row align-items-center justify-content-between">
        {ingredientsList ? (
          <>
            <div className="col-sm-6 mt-4">
              <select
                className="form-control"
                name="chosenIngredient"
                id="data"
                onChange={(e) => {
                  setChosenIngredient(e.target.value);
                }}
              >
                <option>Hozzávaló neve</option>
                {ingredientsList.map((chosenIngredient) => (
                  <option
                    key={chosenIngredient.id}
                    value={JSON.stringify(chosenIngredient)}
                  >
                    {chosenIngredient.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-6">
              <button
                className="btn btn-success mt-4"
                onClick={() => {
                  setIngredientsArray([
                    ...ingredientsArray,
                    JSON.parse(chosenIngredient),
                  ]);
                  setIngredientsList(
                    ingredientsList.filter(
                      (ingredientItem) =>
                        ingredientItem.id !== JSON.parse(chosenIngredient).id
                    )
                  );
                }}
                type="button"
              >
                Hozzáadás
              </button>
            </div>
          </>
        ) : (
          <div>'Loading List...' </div>
        )}

        <div className="col-sm-6 col-md-8 mt-5">
          {ingredientsArray ? (
            <div>
              <div>A keresett hozzávalók listája:</div>
              <div className="row ml-2">
                {ingredientsArray.map((chosenIngredient) => (
                  <div key={chosenIngredient.id}>
                    <> {chosenIngredient.name} , </>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>Loading List... </div>
          )}
        </div>

        <div className="col-sm-6 ">
          <Link
            className="btn btn-success mt-3"
            to={{
              pathname: '/searchResult',
              state: { ingredientsArray: ingredientsArray },
            }}
          >
            Keresés...
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchByIngredient;
