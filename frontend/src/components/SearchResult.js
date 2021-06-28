import { useLocation } from 'react-router';

function SearchResult() {
  const location = useLocation();
  const ingredients = location.state.ingredientsArray;
  return (
    <>
      {ingredients ? (
        <div>
          <div>A keresett hozzávalók listája:</div>
          <div>
            {ingredients.map((ingredient) => (
              <div key={ingredient.id}>
                <> {ingredient.name} , </>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading List... </div>
      )}

      <div>Az eredmények</div>
    </>
  );
}

export default SearchResult;
