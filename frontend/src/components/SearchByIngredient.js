import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getIngredient } from './apiCalls';
function SearchByIngredient() {
  const [ingredientsList, setIngredientsList] = useState();
  const [ertek, setErtek] = useState('');
  const [ertekTomb, setErtekTomb] = useState([]);

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
            </div>
            <div className="col-1">
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
          {ertekTomb ? (
            <div>
              <div>A keresett hozzávalók listája:</div>
              <div className="row">
                {ertekTomb.map((ingredient) => (
                  <div key={ingredient.id}>
                    <> {ingredient.name} , </>
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
