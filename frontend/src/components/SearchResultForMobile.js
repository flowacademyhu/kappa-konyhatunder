import { Col, Row } from 'react-bootstrap';
import '../styles/SearchResultForMobile.css';
import { IoIosAlarm } from 'react-icons/io';
import { IoBarbellSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { getRecipesWithMatchingIngredients } from './apiCalls';

function SearchResultForMobile({ ingredients, searchBy }) {
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    const getRecipes = async () => {
      const recipeList = await getRecipesWithMatchingIngredients(
        ingredients,
        searchBy
      );

      setRecipe(recipeList);
    };

    if (ingredients.length !== 0) {
      getRecipes();
    }
  }, [ingredients, searchBy]);
  return (
    <div>
      <Row>
        <Col></Col>
        <Col>
          {recipe
            ? recipe.map((r) => (
                <div className="contForMobile">
                  <img src={`/api/image/${r.image.id}`} alt="KÉP HELYE" />
                  <div className="contForMobile__text">
                    <div className="recipeNameForMobile">{r.name}</div>
                    <div className="contForMobile__text__star">
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                    </div>
                    <p className="description"> {r.description}</p>
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