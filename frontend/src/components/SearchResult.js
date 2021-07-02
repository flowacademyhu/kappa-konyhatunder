import { Col, Row } from 'react-bootstrap';
import ListGenerator from './ListGenerator';
import defaultImage from '../images/defaultimage.png';
import '../styles/SearchResult.css';
import { IoIosAlarm } from 'react-icons/io';
import { IoBarbellSharp } from 'react-icons/io5';
import { useEffect, useState, useCallback } from 'react';
import { getRecipesWithMatchingIngredients } from './apiCalls';
import styled from 'styled-components';
import ModalForSearch from './ModalForSearch';

const RecipesTitle = styled.div`
  margin-top: 30px;
  font-size: xx-large;
  color: #1e5707;
  font-family: 'Charmonman', cursive !important;
`;


const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 0px;
  margin-bottom: 0px;
  font-size: 1.5rem;
`;
function SearchResult({ ingredients, searchBy }) {

  const [recipesWithAllIngredient, setRecipesWithAllIngredient] = useState([]);
  const [recipesWithAlmostAllIngredient, setRecipesWithAlmostAllIngredient] =
    useState([]);
  const [recipesWithMinimumOneIngredient, setRecipesWithMinimumOneIngredient] =
    useState([]);
  const [show, setShow] = useState(false);
  const handleShow = useCallback(() => {
    setShow(true);
  }, []);


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

    if (ingredients.length !== 0) {
      getRecipes();
    }
  }, [ingredients, searchBy, handleShow]);

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

      <ModalForSearch show={show} onHide={() => setShow(false)} />
    </div>
  );
}

export default SearchResult;
