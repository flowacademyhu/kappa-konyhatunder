import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/SingleRecipe.css';
import { getRecipeList } from './apiCalls';
import { translateMeasurementUnits } from './translateMeasurementUnits';
import { Container, Col, Row } from 'react-bootstrap';
import { IoIosAlarm } from 'react-icons/io';
import { IoBarbellSharp, IoPricetags } from 'react-icons/io5';

export default function SingleRecipe() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const getInitData = async () => {
      setProduct(await getRecipeList(id));
    };
    getInitData();
  }, [id]);

  return product ? (
    <Container>
      <Row>
        <Col>
          <div className="left-side">
            <img
              className="recipeImg"
              src={`/api/image/${product.image.id}`}
              alt={product.image.fileName}
            />

            <div className="preparation-time">
              <div className="icon">
                <IoIosAlarm />
              </div>
              <div className="data">{product.preparationTime} perc</div>
            </div>
            <hr className="solid" />
            <div className="difficulty">
              <div className="icon">
                <IoBarbellSharp />
              </div>
              <div className="data">
                {product.difficulty === 'HARD'
                  ? ' Nehéz'
                  : product.difficulty === 'MEDIUM'
                  ? ' Közepes'
                  : ' Könnyű'}
              </div>
            </div>
            <hr className="solid" />
            <div className="category">
              <div className="icon">
                <IoPricetags />
              </div>
              <div className="data">
                {product.categories.map((category) => category.name + ' ')}
              </div>
            </div>
          </div>
        </Col>
        <Col>
          <div className="right-side-top">
            <div className="recipe-title">{product.name}</div>
            <hr className="solid" />
            <div className="ingredients-title">Hozzávalók</div>
            <ul className="ingredients">
              {product.ingredients.map((i) => (
                <li key={i.id}>
                  {i.ingredient.name}: {i.amount}{' '}
                  {translateMeasurementUnits(i.unit)}
                </li>
              ))}
            </ul>
          </div>

          <div className="right-side-bottom">
            <div className="description-title">Elkészítés</div>
            <div className="description">{product.description}</div>
          </div>
        </Col>
      </Row>
    </Container>
  ) : (
    'Loading'
  );
}
