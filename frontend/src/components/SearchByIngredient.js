import { useEffect, useState } from 'react';
import SearchResultForMobile from './SearchResultForMobile';
import SearchResult from './SearchResult';
import { useMediaQuery } from 'react-responsive';
import { getIngredient } from './apiCalls';
import ModalForFail from './ModalForFail';

function SearchByIngredient() {
  const [ingredientsList, setIngredientsList] = useState();
  const [chosenIngredient, setChosenIngredient] = useState('');
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const isMobile = useMediaQuery({ query: `(max-width: 576px)` });
  const [showFail, setShowFail] = useState(false);
  const handleShowFail = () => setShowFail(true);

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
                onClick={() =>
                  chosenIngredient
                    ? (setIngredientsArray([
                        ...ingredientsArray,
                        JSON.parse(chosenIngredient),
                      ]),
                      setIngredientsList(
                        ingredientsList.filter(
                          (ingredientItem) =>
                            ingredientItem.id !==
                            JSON.parse(chosenIngredient).id
                        )
                      ))
                    : handleShowFail()
                }
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

        <div className="col-sm-6 "></div>
      </div>
      {isMobile ? (
        <SearchResultForMobile
          ingredients={ingredientsArray}
          searchBy={'ingredients'}
        />
      ) : (
        <SearchResult ingredients={ingredientsArray} searchBy={'ingredients'} />
      )}

      <ModalForFail show={showFail} onHide={() => setShowFail(false)} />
    </div>
  );
}

export default SearchByIngredient;
