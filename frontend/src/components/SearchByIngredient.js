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
    <div className="container mt-4">
      <div className="row align-items-center justify-content-between">
        {ingredientsList ? (
          <>
            <div className="col-6">
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
            <div className="col-1">
              <button
                className="btn btn-success"
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
                +
              </button>
            </div>
          </>
        ) : (
          <div>'Loading List...' </div>
        )}

        <div className="col-4">
          {ingredientsArray ? (
            <div>
              <div>A keresett hozzávalók listája:</div>
              <div className="row">
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
        <div className="col-1">
          <Link className="btn btn-primary" to="/searchResult">
            Keresés...
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchByIngredient;
