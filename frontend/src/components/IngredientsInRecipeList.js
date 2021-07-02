function IngredientsInRecipeList({ ingredientsList }) {
  return (
    <>
      {ingredientsList ? (
        <div className="container">
          {ingredientsList
            .filter((e) => e.ingredient !== undefined)
            .map((ingredient) => (
              <div
                key={ingredient.ingredient.id ? ingredient.ingredient.id : '1'}
                className="row"
              >
                <div className="col">
                  Hozzávaló : {ingredient.ingredient.name}
                </div>
                <div className="col">
                  Mennyiség : {ingredient.amount} {ingredient.unit}
                </div>
                {console.log(ingredient)}
              </div>
            ))}
        </div>
      ) : (
        <div>Loading List... </div>
      )}
    </>
  );
}
export default IngredientsInRecipeList;
