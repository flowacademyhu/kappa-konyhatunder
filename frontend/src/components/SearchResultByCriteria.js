import { useLocation } from 'react-router';

function SearchResultByCriteria() {
  const location = useLocation();
  const criterias = location.state.values;

  return (
    <div className="container">
      {criterias ? (
        <div>
          A kritériumok listája:
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

      <div>Az eredmények</div>
      <></>
    </div>
  );
}

export default SearchResultByCriteria;
