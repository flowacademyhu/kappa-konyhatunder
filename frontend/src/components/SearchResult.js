import { useLocation } from 'react-router';

function SearchResult() {
  const location = useLocation();
  const ingredients = location.state.ingredientsArray;
  const criterias = location.state.values;
  const search = location.state.search;
  return (
    <>
      {ingredients ? (
        <div>
          {console.log('crit', criterias, 'search', search)}
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
      {criterias ? (
        <div>
          {console.log(search)}A kritériumok listája:
          <div className="row">
            <div className="col">A recept neve: {criterias.name}</div>
            <div className="col">
              Az Elkészítési idő :{criterias.preparationTime}
            </div>
            <div className="col">
              A recept nehézsége :{criterias.difficulty}
            </div>
            <div></div> Legyen róla kép :
            {criterias.picture ? <div>Igen</div> : <div>Nem</div>}
          </div>
          <div>A Kiválasztott kategóri(ák) :{criterias.categories}</div>
        </div>
      ) : (
        <div>Loading List... </div>
      )}
    </>
  );
}

export default SearchResult;
