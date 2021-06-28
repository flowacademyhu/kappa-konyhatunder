import { useLocation } from 'react-router';

function SearchResult() {
  const location = useLocation();
  const ingredients = location.state.ingredientsArray;
  return (
    <>
      <div>Az eredmények</div>
      <button
        className="btn btn-success"
        onClick={() => console.log(ingredients)}
        type="button"
      >
        +
      </button>
    </>
  );
}

export default SearchResult;
