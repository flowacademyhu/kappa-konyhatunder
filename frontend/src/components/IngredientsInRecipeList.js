function IngredientsInRecipeList({ newIngredientsList }) {
  return (
    <>
      {newIngredientsList ? (
        <ul className="list-group">
          {newIngredientsList.map((ing) => (
            <li
              key={ing.ingredient.id}
              className="list-group-item list-group-item-action"
            >
              <div key={ing.ingredient.id} className="row">
                <div className="col">Hozzávaló : {ing.ingredient.name} </div>{' '}
                <div className="col">
                  Mennyiség : {ing.amount} {ing.unit}{' '}
                </div>
              </div>
            </li>
          ))}{' '}
        </ul>
      ) : (
        <div>'Loading List...' </div>
      )}
    </>
  );
}
export default IngredientsInRecipeList;
