import { Col, Row, Container } from 'react-bootstrap';
import defaultImage from '../images/defaultimage.png';
import '../styles/SearchResultForMobile.css';
import { IoIosAlarm, IoIosPricetags } from 'react-icons/io';
import { IoBarbellSharp } from 'react-icons/io5';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { getRecipesWithMatchingIngredients } from './apiCalls';

function SearchResultForMobile() {
  const [recipe, setRecipe] = useState([{}]);
  const location = useLocation();
  const ingredients = location.state.ingredientsArray;

  useEffect(() => {
    const getRecipes = async () => {
      const vmi = await getRecipesWithMatchingIngredients(ingredients);
      console.log(vmi);
      setRecipe(vmi);
    };
    getRecipes();
  }, []);

  return (
    <div>
      <Row>
        <Col></Col>
        <Col>
          {recipe
            ? recipe.map((r) => (
                <div class="contForMobile">
                  <img
                    src={
                      r.image
                        ? r.image.fileName === 'abc'
                          ? defaultImage
                          : `/api/image/${r.image.id}`
                        : defaultImage
                    }
                    alt="KÉP HELYE"
                  />
                  <div class="contForMobile__text">
                    <div className="recipeNameForMobile">{r.name}</div>
                    <div class="contForMobile__text__star">
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                    </div>
                    <p className="description">{r.description}</p>
                    <div class="contForMobile__text__timing">
                      <div class="contForMobile__text__timing_time">
                        <div>
                          <div className="cardIconForMobile">
                            <IoIosAlarm />
                          </div>
                          <div className="time">{r.preparationTime} perc</div>
                        </div>
                      </div>
                      <div class="contForMobile__text__timing_time">
                        <div>
                          <div className="cardIconForMobile">
                            <IoBarbellSharp />
                          </div>
                          <p className="difficulty">{r.difficulty}</p>
                        </div>
                      </div>
                    </div>
                    <button class="btnForMobile">
                      <i class="fa fa-arrow-right">Elkészítem !</i>
                    </button>
                  </div>
                </div>
              ))
            : 'Loading...'}
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default SearchResultForMobile;
