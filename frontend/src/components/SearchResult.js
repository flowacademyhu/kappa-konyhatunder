import { Col, Row } from 'react-bootstrap';
import defaultImage from '../images/defaultimage.png';
import '../styles/SearchResult.css';
import { IoIosAlarm } from 'react-icons/io';
import { IoBarbellSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { getRecipesWithMatchingIngredients } from './apiCalls';
import ModalForSearch from './ModalForSearch';

function SearchResult({ ingredients, searchBy }) {
  const [recipe, setRecipe] = useState(null);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getRecipes = async () => {
      const recipeList = await getRecipesWithMatchingIngredients(
        ingredients,
        searchBy
      );
      recipeList?.sort((a, b) => a.name.localeCompare(b.name));

      setRecipe(recipeList);
      if (recipeList.length === 0) handleShow();
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
                <div className="cont" key={r.id}>
                  <img
                    src={
                      r.image.fileName === 'defaultImage'
                        ? defaultImage
                        : `/api/image/${r.image.id}`
                    }
                    alt="Kép a receptről"
                  />
                  <div className="cont__text">
                    <h1>{r.name}</h1>

                    <p>{r.description}</p>
                    <div className="cont__text__timing">
                      <div className="cont__text__timing_time">
                        <div>
                          <div className="cardIcon">
                            <IoIosAlarm />
                          </div>
                          <div className="time">{r.preparationTime} perc</div>
                        </div>
                      </div>
                      <div className="cont__text__timing_time">
                        <div>
                          <div className="cardIcon">
                            <IoBarbellSharp />
                          </div>
                          <p>{r.difficulty}</p>
                        </div>
                      </div>
                    </div>
                    <button className="btn">
                      <i className="fa fa-arrow-right">Elkészítem !</i>
                    </button>
                  </div>
                </div>
              ))
            : 'Loading...'}
        </Col>
        <Col></Col>
      </Row>

      <ModalForSearch show={show} onHide={() => setShow(false)} />
    </div>
  );
}

export default SearchResult;
