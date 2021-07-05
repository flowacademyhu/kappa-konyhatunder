import { useState, useEffect } from 'react';
import { translateIngredient } from './transleteIngredientsMeasurement';
import axios from 'axios';
import { getIngredient } from './apiCalls';

export default function IngredientsAdder({
  onIngredientAdded,
  exludedIngredients,
}) {
  const [amount, setAmount] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [newIngredientType, setNewIngredientType] = useState('-');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [newIngredientTypeList, setNewIngredientTypeList] = useState([]);

  useEffect(() => {
    const getInitData = async () => {
      setIngredientsList(await getIngredient());
    };
    getInitData();
  }, []);

  async function onIngredientTypeChange(newIngredientString) {
    const newIngredientObject = JSON.parse(newIngredientString);
    try {
      setNewIngredientType(newIngredientType);

      const response = await axios.get(
        `/api/ingredients/${newIngredientObject.id}`
      );

      setIngredient(newIngredientObject);

      setNewIngredientType(response.data.measurements[0]);

      setNewIngredientTypeList(response.data.measurements);
    } catch (error) {
      console.error(error);
    }
  }

  const addIngredientToRecipe = () => {
    if (
      !ingredient ||
      ingredient.name === '' ||
      !amount ||
      !newIngredientType
    ) {
      console.log('sikertelen', ingredient, amount);

      return;
    }
    console.log('sikertelen', ingredient, amount);
    onIngredientAdded({
      ingredient: ingredient,
      unit: newIngredientType,
      amount: amount,
    });

    setAmount('');
    setNewIngredientTypeList([]);
  };

  return (
    <>
      <span className="text-danger">★</span>
      <label className="mt-2" htmlFor="long">
        Hozzávaló hozzáadása
      </label>
      <div className="row align-items-center justify-content-between">
        <div className="col-4">
          <select
            className="form-control"
            name="ingredient"
            onChange={(e) => {
              e.target.value
                ? onIngredientTypeChange(e.target.value)
                : onIngredientTypeChange('');
            }}
          >
            <option>Hozzávaló neve</option>

            {ingredientsList

              .filter(
                (ingredient) =>
                  !exludedIngredients
                    .map(
                      (excludedIngredient) => excludedIngredient.ingredient.id
                    )
                    .includes(ingredient.id)
              )
              .map((l) => (
                <option key={l.id} value={JSON.stringify(l)}>
                  {translateIngredient(l.name, l.measurement)}
                </option>
              ))}
          </select>
        </div>

        <div className="col-2">
          <select
            className="form-control"
            name="ingredientType"
            onChange={(e) => {
              setNewIngredientType(JSON.parse(e.target.value));
            }}
          >
            {newIngredientTypeList.map((l) => (
              <option key={l} value={JSON.stringify(l)}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div className="col-3">
          <input
            className="form-control"
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Mennyiség"
          />
        </div>
        <div className="col">
          <button
            className="btn btn-success"
            onClick={() => addIngredientToRecipe()}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
