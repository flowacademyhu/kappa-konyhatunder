import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import picture from '../images/image-5.jpg';
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
          <div className="left-side">
            <img className="recipeImg" src={picture} />

            <div className="preparation-time">
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
                magyar, egyszerű, édes, desszert, sütemény, laktató
              </div>
            </div>
          </div>
        </Col>
        <Col>
          <div className="right-side-top">
            <div className="recipe-title">Sajttorta</div>
            <hr class="solid" />
            <div className="ingredients-title">Hozzávalók</div>
            <ul className="ingredients">
              <li>Liszt</li> <li>Cukor</li> <li>Mascarpone</li>
            </ul>
          </div>

          <div className="right-side-bottom">
            <div className="description-title">Elkészítés</div>
            <div className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              lacinia, ante et imperdiet pellentesque, velit arcu porta lorem,
              sed posuere erat dolor a eros. Sed finibus volutpat diam maximus
              accumsan. Nullam quam odio, pretium et posuere eu, convallis
              fermentum nunc. Suspendisse commodo hendrerit ultricies. Interdum
              et malesuada fames ac ante ipsum primis in faucibus. Suspendisse
              varius suscipit rutrum. Maecenas ac arcu nunc. Curabitur sagittis
              purus ut mi congue efficitur eu sed arcu. Duis et risus magna.
              Proin sodales turpis nisi. Ut quis aliquet leo. Sed vitae justo ut
              felis gravida egestas. In non sodales arcu. Fusce ac imperdiet
              tellus. Phasellus tempor semper lectus, et interdum tellus
              tristique ut. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. In hac habitasse platea dictumst. Nulla nisi neque,
              aliquam quis mi a, rhoncus commodo odio. Vivamus eleifend viverra
              est ut eleifend. Vestibulum mollis, quam in dignissim blandit,
              mauris enim malesuada urna, sit.
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
