import { Col, Row } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { getRecipesWithMatchingIngredients } from './apiCalls';
import ListGenerator from './ListGenerator';

function SearchResult({ ingredients, searchBy }) {
  const [recipesWithAllIngredient, setRecipesWithAllIngredient] = useState([]);
  const [recipesWithAlmostAllIngredient, setRecipesWithAlmostAllIngredient] =
    useState([]);
  const [recipesWithMinimumOneIngredient, setRecipesWithMinimumOneIngredient] =
    useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const recipeList = await getRecipesWithMatchingIngredients(
        ingredients,
        searchBy
      );
      console.log(recipeList);
      setRecipesWithAllIngredient(recipeList.recipesWithAllIngredient);
      setRecipesWithAlmostAllIngredient(
        recipeList.recipesWithAlmostAllIngredient
      );
      setRecipesWithMinimumOneIngredient(
        recipeList.recipesWithMinimumOneIngredient
      );
    };
    getRecipes();
  }, [ingredients, searchBy]);

  return (
    <div>
      <Row>
        <Col></Col>{' '}
        <Col>
          {recipesWithAllIngredient[0] && (
            <div>
              <div>Receptek amihez nem kell vásárolni: </div>
              <ListGenerator recips={recipesWithAllIngredient} />
            </div>
          )}
          {recipesWithAlmostAllIngredient[0] && (
            <div>
              <div>Receptek amihez keveset kell vásárolni: </div>
              <ListGenerator recips={recipesWithAlmostAllIngredient} />
            </div>
          )}
          {recipesWithMinimumOneIngredient[0] && (
            <div>
              <div>Receptek amihez nagy bevásárlás kell: </div>
              <ListGenerator recips={recipesWithMinimumOneIngredient} />
            </div>
          )}
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default SearchResult;
