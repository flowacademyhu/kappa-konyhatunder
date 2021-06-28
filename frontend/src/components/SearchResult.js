import { useLocation } from 'react-router';

function SearchResult() {
  const location = useLocation();
  const ingredients = location.state.ingredientsArray;
  return (
    <>
      <div>Az eredmények</div>
    </>
  );
}

export default SearchResult;
