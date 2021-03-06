function IngredientsInRecipeList({ ingredientsList, setIngredientsList }) {
  const remove = async (id) => {
    setIngredientsList(
      ingredientsList.filter((ingredients) => ingredients.ingredient.id !== id)
    );
  };

  return (
    <>
      {ingredientsList ? (
        <div className="container">
          {ingredientsList
            .filter((e) => e.ingredient !== undefined)
            .map((ingredient) => (
              <div
                key={ingredient.ingredient.id ? ingredient.ingredient.id : '1'}
                className="row mt-4"
              >
                <div className="col">
                  Hozzávaló : {ingredient.ingredient.name}
                </div>
                <div className="col">
                  Mennyiség : {ingredient.amount} {ingredient.unit}
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => {
                    remove(ingredient.ingredient.id);
                  }}
                >
                  Törlés
                </button>
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
