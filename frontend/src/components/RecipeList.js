import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListGenerator from './ListGenerator';
import { Col, Row } from 'react-bootstrap';

const recipeAPI = axios.create({
  baseURL: '/api/',
});

function RecipeList({ ingredients }) {
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    async function getRecipeList() {
      try {
        const response = await recipeAPI.get('recipes');
        setRecipes(response.data);
      } catch (err) {
        console.error('Error during api call:', err);
      }
    }
    getRecipeList();
  }, []);

  return (
    <div>
      <Row>
        <Col></Col>{' '}
        <Col>
          {recipes ? (
            <ListGenerator recips={recipes} ingredients={ingredients} />
          ) : (
            <div>'Loading List...' </div>
          )}
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default RecipeList;
