import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/SingleRecipe.css';
import { getRecipeList, recommend } from './apiCalls';
import { translateMeasurementUnits } from './translateMeasurementUnits';
import { Container, Col, Row, Spinner, Button } from 'react-bootstrap';
import { IoIosAlarm } from 'react-icons/io';
import { IoBarbellSharp, IoPricetags, IoHeartSharp } from 'react-icons/io5';
import styled from 'styled-components';
import defaultImage from '../images/defaultimage.png';

const LeftSide = styled.div`
  background-color: #c7c7c75b;
  grid-template-columns: 225px 100px;
  border-radius: 5px;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.356);
  margin-top: 20px;
  margin-bottom: 80px;
  padding: 20px;
`;

const LeftSideText = styled.div`
  display: flex;
`;

const DisplayText = styled.div`
  margin-top: 25px;
  font-size: 25px;
  margin-left: 20px;
  color: #2e860b;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

const Icon = styled.div`
  font-size: 50px;
  margin-left: 50px;
  margin-top: 15px;
  color: #4e4e4e;
`;

const Line = styled.hr`
  border: none;
  height: 20px;
  width: 90%;
  height: 50px;
  margin-top: 0;
  border-bottom: 1px solid #2e860b00;
  box-shadow: 0 20px 20px -20px #174405c9;
  margin: -50px auto 10px;
`;

const RightSide = styled.div`
  background-color: #c7c7c75b;
  width: 700px;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.356);
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  max-height: 100%;
  max-width: 100%;
`;

const Title = styled.div`
  font-size: ${(props) => props.size}px;
  font-family: ${(props) =>
    props.fancy ? 'Charmonman, cursive !important' : ''};
  color: #267009;
  margin-top: 40px;
  margin-left: 30px;
`;

const Text = styled.div`
  color: #424242;
  font-size: 20px;
  margin: 30px 10px 20px 10px;
`;

export default function SingleRecipe() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [recommendations, setRecommendations] = useState();

  useEffect(() => {
    const getInitData = async () => {
      setProduct(await getRecipeList(id));
    };
    getInitData();
  }, [id]);

  useEffect(() => {
    setRecommendations(
      product
        ? product.recommendations === undefined
          ? 0
          : product.recommendations
        : 0
    );
  }, [product]);

  const handleRecomend = () => {
    if (!localStorage.getItem(`${product.id}`)) {
      setRecommendations(recommendations + 1);
      localStorage.setItem(`${product.id}`, true);
      recommend(product.id, 'plus');
    } else {
      setRecommendations(recommendations - 1);
      localStorage.removeItem(`${product.id}`);
      recommend(product.id, 'minus');
    }
  };

  return product ? (
    <Container>
      <Row>
        <Col>
          <LeftSide>
            <img
              className="recipeImg"
              src={
                product.image.fileName === 'defaultImage'
                  ? defaultImage
                  : `/api/image/${product.image.id}`
              }
              alt="Kép a receptről"
            />
            <LeftSideText>
              <Icon>
                <IoIosAlarm />
              </Icon>
              <DisplayText>{product.preparationTime} perc</DisplayText>
            </LeftSideText>
            <Line />
            <LeftSideText>
              <Icon>
                <IoBarbellSharp />
              </Icon>
              <DisplayText>
                {product.difficulty === 'HARD'
                  ? ' Nehéz'
                  : product.difficulty === 'MEDIUM'
                  ? ' Közepes'
                  : ' Könnyű'}
              </DisplayText>
            </LeftSideText>
            <Line />
            <LeftSideText>
              <Icon>
                <IoPricetags />
              </Icon>
              <DisplayText>
                {product.categories.map((category) => ' #' + category.name)}
              </DisplayText>
            </LeftSideText>
            <Line />
            {recommendations !== undefined && recommendations !== 0 ? (
              <>
                <LeftSideText>
                  <Icon>
                    <IoHeartSharp />
                  </Icon>
                  <DisplayText>{recommendations} ajánlás</DisplayText>
                </LeftSideText>
                <Line />
              </>
            ) : (
              ''
            )}
            <LeftSideText>
              <Button variant="success" onClick={handleRecomend}>
                Ajánlanád?
                <span className="sr-only">Ajánlások</span>
              </Button>
            </LeftSideText>
          </LeftSide>
        </Col>
        <Col>
          <RightSide>
            <Title size="60" fancy="true">
              {product.name}
            </Title>
            <Line />
            <Title size="30">Hozzávalók</Title>
            <Text>
              {product.ingredients.map((i) => (
                <li key={i.id}>
                  {i.ingredient.name}: {i.amount}
                  {' ' + translateMeasurementUnits(i.unit)}
                </li>
              ))}
            </Text>
          </RightSide>

          <RightSide>
            <Title size="30">Elkészítés</Title>
            <Text>{product.description}</Text>
          </RightSide>
        </Col>
      </Row>
    </Container>
  ) : (
    <Spinner animation="border" />
  );
}
