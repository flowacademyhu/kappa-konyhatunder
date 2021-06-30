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
      const recipeList = await getRecipesWithMatchingIngredients(ingredients);
      recipeList.sort((a, b) => a.name.localeCompare(b.name));
      setRecipe(recipeList);
    };
    getRecipes();
  }, [ingredients]);

  return (
    <div>
      <Row>
        <Col></Col>
        <Col>
          {recipe
            ? recipe.map((r) => (
                <div className="contForMobile">
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
                  <div className="contForMobile__text">
                    <div className="recipeNameForMobile">
                      {r.name ? r.name.substring(0, 20) : 'loading'}
                    </div>
                    <div className="contForMobile__text__star">
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                    </div>
                    <p className="description">
                      {' '}
                      {r.description
                        ? r.description.substring(0, 250)
                        : 'loading'}
                    </p>
                    <div className="contForMobile__text__timing">
                      <div className="contForMobile__text__timing_time">
                        <div>
                          <div className="cardIconForMobile">
                            <IoIosAlarm />
                          </div>
                          <div className="time">{r.preparationTime} perc</div>
                        </div>
                      </div>
                      <div className="contForMobile__text__timing_time">
                        <div>
                          <div className="cardIconForMobile">
                            <IoBarbellSharp />
                          </div>
                          <p className="difficulty">{r.difficulty}</p>
                        </div>
                      </div>
                    </div>
                    <button className="btnForMobile">
                      <i className="fa fa-arrow-right" key={r.id}>
                        Elkészítem !
                      </i>
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
