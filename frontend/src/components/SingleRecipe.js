import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../styles/SingleRecipe.css';
import { getRecipeList, recommend } from './apiCalls';
import { translateMeasurementUnits } from './translateMeasurementUnits';
import { Container, Col, Row, Spinner, Button } from 'react-bootstrap';
import { IoIosAlarm } from 'react-icons/io';
import { IoBarbellSharp, IoPricetags, IoHeartSharp } from 'react-icons/io5';
import styled from 'styled-components';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import myFont from '../images/Montserrat-Regular.ttf';

const LeftSide = styled.div`
  background-color: #c7c7c75b;
  grid-template-columns: 225px 100px;
  border-radius: 5px;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.356);
  margin-top: 20px;
  margin-bottom: 80px;
  padding: 20px;
`;

const LeftSideTextArea = styled.div`
  display: flex;
`;

const LeftSideText = styled.div`
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

const IngredientText = styled.div`
  color: #${(props) => (props.available ? '38a30e' : 'a30e0e')};
  font-size: 20px;
  margin: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  padding: 28px;
  margin-left: 5px;
  @media screen and (max-width: 576px) {
    padding: 23px;
  }
`;

const ShoppingListButton = styled.div`
  margin-top: 20px;
  text-align: right;
`;

export default function SingleRecipe() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [recommendations, setRecommendations] = useState();

  const location = useLocation();
  const ingredients = location.state.ingredient;
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

  const ShoppingListGenerator = () => {
    let doc = new jsPDF();
    let shoppingArr = [];
    if (ingredients === undefined) {
      product.ingredients.map((i) =>
        shoppingArr.push({
          ingredient: i.ingredient.name,
          amount: i.amount + ' ' + translateMeasurementUnits(i.unit),
        })
      );
    } else {
      let allIngredients = [...product.ingredients];
      const result = allIngredients.filter((ad) =>
        ingredients.every((fd) => fd.name !== ad.ingredient.name)
      );
      result.map((i) =>
        shoppingArr.push({
          ingredient: i.ingredient.name,
          amount: i.amount + '  ' + translateMeasurementUnits(i.unit),
        })
      );
    }

    doc.addFont(myFont, 'Montserrat-Regular', 'normal');
    doc.setFont('Montserrat-Regular');

    doc.setFontSize(22);
    doc.text(20, 20, 'Bevásárlólista');
    doc.setFontSize(16);
    doc.text(20, 35, product.name);

    doc.autoTable({
      styles: {
        fillColor: [0, 255, 0],
        textColor: [0, 0, 0],
        font: 'Montserrat-Regular',
        halign: 'center',
      },
      columnStyles: { 0: { halign: 'left' }, 1: { halign: 'left' } }, // Cells in first column centered and green
      margin: { top: 40 },
      body: shoppingArr,
      columns: [
        { header: 'Hozzávaló', dataKey: 'ingredient' },
        { header: 'Mennyiség', dataKey: 'amount' },
      ],
    });
    doc.save(`Bevasarlolista-${product.name}-KonyhaTunder.pdf`);
    doc = new jsPDF('portrait');
  };

  const PDFGenerator = () => {
    let doc = new jsPDF();

    doc.addFont(myFont, 'Montserrat-Regular', 'normal');
    doc.setFont('Montserrat-Regular');

    doc.setFontSize(22);
    doc.text(20, 20, product.name);

    let bodyArr = [];
    product.ingredients.map((i) =>
      bodyArr.push({
        ingredient: i.ingredient.name,
        amount: i.amount + ' ' + translateMeasurementUnits(i.unit),
      })
    );
    doc.setFontSize(16);
    doc.text(20, 35, 'Hozzávalók');

    doc.autoTable({
      styles: {
        fillColor: [0, 255, 0],
        textColor: [0, 0, 0],
        font: 'Montserrat-Regular',
        halign: 'center',
      },
      columnStyles: { 0: { halign: 'left' }, 1: { halign: 'left' } }, // Cells in first column centered and green
      margin: { top: 40 },
      body: bodyArr,
      columns: [
        { header: 'Hozzávaló', dataKey: 'ingredient' },
        { header: 'Mennyiség', dataKey: 'amount' },
      ],
    });
    doc.setFontSize(16);
    doc.text(20, 75 + bodyArr.length * 6, 'Elkészítés');

    doc.setFontSize(12);

    var splitTitle = doc.splitTextToSize(product.description, 150);

    doc.text(20, 80 + bodyArr.length * 6, splitTitle);

    doc.save(`${product.name}-KonyhaTunder.pdf`);
    doc = new jsPDF('portrait');
  };

  return product ? (
    <Container>
      <Row>
        <Col>
          <LeftSide>
            <img
              className="recipeImg"
              src={`/api/image/${product.image.id}`}
              alt="Kép a receptről"
            />
            <LeftSideTextArea>
              <Icon>
                <IoIosAlarm />
              </Icon>
              <LeftSideText>{product.preparationTime} perc</LeftSideText>
            </LeftSideTextArea>
            <Line />
            <LeftSideTextArea>
              <Icon>
                <IoBarbellSharp />
              </Icon>
              <LeftSideText>
                {product.difficulty === 'HARD'
                  ? ' Nehéz'
                  : product.difficulty === 'MEDIUM'
                  ? ' Közepes'
                  : ' Könnyű'}
              </LeftSideText>
            </LeftSideTextArea>
            <Line />
            <LeftSideTextArea>
              <Icon>
                <IoPricetags />
              </Icon>
              <LeftSideText>
                {product.categories.map((category) => ' #' + category.name)}
              </LeftSideText>
            </LeftSideTextArea>
            <Line />
            {recommendations !== undefined && recommendations !== 0 ? (
              <>
                <LeftSideTextArea>
                  <Icon>
                    <IoHeartSharp />
                  </Icon>
                  <LeftSideText>{recommendations} ajánlás</LeftSideText>
                </LeftSideTextArea>
                <Line />
              </>
            ) : (
              ''
            )}
            <ButtonGroup>
              <ButtonStyle>
                <Button variant="success" onClick={handleRecomend}>
                  Ajánlanád?
                  <span className="sr-only">Ajánlások</span>
                </Button>{' '}
              </ButtonStyle>{' '}
              <ButtonStyle>
                <Button variant="success" onClick={PDFGenerator}>
                  Nyomtatás
                </Button>
              </ButtonStyle>
            </ButtonGroup>
          </LeftSide>
        </Col>
        <Col>
          <RightSide>
            <Title size="60" fancy="true">
              {product.name}
            </Title>
            <Line />
            <Title size="30">Hozzávalók </Title>

            {product.ingredients.map((i) => (
              <IngredientText
                available={
                  ingredients
                    ? ingredients.some(
                        (item) => item.name === i.ingredient.name
                      )
                    : true
                }
                key={i.id}
              >
                <li>
                  {i.ingredient.name}: {i.amount}
                  {' ' + translateMeasurementUnits(i.unit)}
                </li>
              </IngredientText>
            ))}
            <ShoppingListButton>
              <Button variant="success" onClick={ShoppingListGenerator}>
                Bevásárlólista nyomtatása
              </Button>
            </ShoppingListButton>
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
