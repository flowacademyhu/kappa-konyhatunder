function IngredientsInRecipeList({ ingredientsList }) {
  return (
    <>
      {ingredientsList ? (
        <div className="container">
          {ingredientsList.map((ingredient) => (
            <div key={ingredient.ingredient.id} className="row">
              <div className="col">
                Hozzávaló : {ingredient.ingredient.name}
              </div>
              <div className="col">
                Mennyiség : {ingredient.amount} {ingredient.unit}
              </div>
            </div>
          ))}{' '}
        </div>
      ) : (
        <div>Loading List... </div>
      )}
    </>
  );
}
export default IngredientsInRecipeList;
