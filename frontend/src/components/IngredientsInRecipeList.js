function IngredientsInRecipeList({ newIngredientsList }) {
  return (
    <>
      {newIngredientsList ? (
        <div className="container">
          {newIngredientsList.map((ing) => (
            <div key={ing.ingredient.id} className="row">
              <div className="col">Hozzávaló : {ing.ingredient.name}</div>
              <div className="col">
                Mennyiség : {ing.amount} {ing.unit}
              </div>
            </div>
          ))}{' '}
        </div>
      ) : (
        <div>'Loading List...' </div>
      )}
    </>
  );
}
export default IngredientsInRecipeList;
