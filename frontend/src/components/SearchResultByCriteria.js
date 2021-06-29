import { useLocation } from 'react-router';

function SearchResultByCriteria() {
  const location = useLocation();
  const criterias = location.state.values;
  return (
    <>
      {criterias ? (
        <div>
          <div>A keresett hozzávalók listája:</div>
          <div>{criterias.name}</div>
          <div>{criterias.preparationTime}</div>
          <div>{criterias.difficulty}</div>
          <div>
            {' '}
            Kell kép? :{criterias.picture ? <div>Nem</div> : <div>Nem</div>}
          </div>
        </div>
      ) : (
        <div>Loading List... </div>
      )}

      <div>Az eredmények</div>
    </>
  );
}

export default SearchResultByCriteria;
