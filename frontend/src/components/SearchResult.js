import { Col, Row, Container } from 'react-bootstrap';
import defaultImage from '../images/defaultimage.png';
import '../styles/SearchResult.css';
import { IoIosAlarm, IoIosPricetags } from 'react-icons/io';
import { IoBarbellSharp } from 'react-icons/io5';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { getRecipesWithMatchingIngredients } from './apiCalls';

function SearchResult() {
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
  }, []);

  return (
    <div>
      <Row>
        <Col></Col>
        <Col>
          {recipe
            ? recipe.map((r) => (
                <div class="cont">
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
                  <div class="cont__text">
                    <h1>{r.name ? r.name.substring(0, 25) : 'loading'}</h1>

                    <p>
                      {r.description
                        ? r.description.substring(0, 250)
                        : 'loading'}
                    </p>
                    {/*meg kell számolni hány kerekter leirás fér ki rendesen */}
                    <div class="cont__text__timing">
                      <div class="cont__text__timing_time">
                        <div>
                          <div className="cardIcon">
                            <IoIosAlarm />
                          </div>
                          <div className="time">{r.preparationTime} perc</div>
                        </div>
                      </div>
                      <div class="cont__text__timing_time">
                        <div>
                          <div className="cardIcon">
                            <IoBarbellSharp />
                          </div>
                          <p>{r.difficulty}</p>
                        </div>
                      </div>
                    </div>
                    <button class="btn">
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

export default SearchResult;
