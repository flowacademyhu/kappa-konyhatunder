import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';

const recipeAPI = axios.create({
  baseURL: '/api/',
});

function SearchResultByCriteria() {
  useEffect(() => {
    async function getRecipeList() {
      try {
        const response = await recipeAPI.get('recipes');
        setRecipes(response.data);
        //*  let resultList = recipes.filter(
        //    (recipe) => criterias.difficulty === recipe.difficulty );
      } catch (err) {
        console.error('Error during api call:', err);
      }
    }
    getRecipeList();
  }, []);

  const location = useLocation();
  const criterias = location.state.values;
  const [recipes, setRecipes] = useState();

  return (
    <div className="container">
      {criterias ? (
        <div>
          {' '}
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
      <>
        {recipes ? (
          <>
            {console.log('receptbol jött', recipes)}
            {console.log('criteriabol jött', criterias.difficulty)}
            {recipes
              .filter((e) => e.preparationTime < criterias.preparationTime)
              .map((recipes) => (
                <div>{recipes.name}</div>
              ))}{' '}
          </>
        ) : (
          <div>'Loading List...' </div>
        )}
      </>
    </div>
  );
}

export default SearchResultByCriteria;
