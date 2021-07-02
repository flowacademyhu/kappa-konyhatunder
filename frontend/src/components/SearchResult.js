import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getRecipesWithMatchingIngredients } from './apiCalls';
import ListGenerator from './ListGenerator';

const RecipesTitle = styled.div`
  margin-top: 30px;
  font-size: xx-large;
  color: #1e5707;
  font-family: 'Charmonman', cursive !important;
`;

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
              <RecipesTitle>Receptek amihez nem kell vásárolni: </RecipesTitle>
              <ListGenerator recips={recipesWithAllIngredient} />
            </div>
          )}
          {recipesWithAlmostAllIngredient[0] && (
            <div>
              <RecipesTitle>
                Receptek amihez keveset kell vásárolni:{' '}
              </RecipesTitle>
              <ListGenerator recips={recipesWithAlmostAllIngredient} />
            </div>
          )}
          {recipesWithMinimumOneIngredient[0] && (
            <div>
              <RecipesTitle>
                Receptek amihez nagy bevásárlás kell:{' '}
              </RecipesTitle>
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
