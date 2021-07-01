import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import picture from '../images/KonyhatunderDefaultImageWide.png';
import { Link } from 'react-router-dom';
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

  return (
    <Container>
      <Row>
        <Col>
          <div className="leftSide">
            <div className="recipeI">
              <img className="recipeImg" src={picture} />
            </div>

            <div className="preparationTime">
              <div className="icon">
                <IoIosAlarm />
              </div>
              <div className="data">30 perc</div>
            </div>
            <hr class="solid" />
            <div className="difficulty">
              <div className="icon">
                <IoBarbellSharp />
              </div>
              <div className="data"> Nehéz</div>
            </div>
            <hr class="solid" />
            <div className="category">
              <div className="icon">
                <IoPricetags />
              </div>
              <div className="data">
                magyar, egyszerű, sós, húsos, fűszeres, paprikás
              </div>
            </div>
          </div>
        </Col>
        <Col>
          masik hulyeseg
          <Row>valami</Row>
        </Col>
      </Row>
    </Container>
  );
}
