import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListGenerator from './ListGenerator';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

const recipeAPI = axios.create({
  baseURL: '/api/',
});

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 400px;
`;

function RecipeList() {
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
            <ListGenerator recips={recipes} />
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
