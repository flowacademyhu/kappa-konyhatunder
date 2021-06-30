import { Col, Row } from 'react-bootstrap';
import defaultImage from '../images/defaultimage.png';
import '../styles/SearchResult.css';
import { IoIosAlarm } from 'react-icons/io';
import { IoBarbellSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { getRecipesWithMatchingIngredients } from './apiCalls';

function SearchResult({ ingredients, searchBy }) {
  const [recipe, setRecipe] = useState([{}]);

  useEffect(() => {
    const getRecipes = async () => {
      const recipeList = await getRecipesWithMatchingIngredients(
        ingredients,
        searchBy
      );
      recipeList.sort((a, b) => a.name.localeCompare(b.name));
      setRecipe(recipeList);
    };
    getRecipes();
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
                      r.image
                        ? r.image.fileName === 'abc'
                          ? defaultImage
                          : `/api/image/${r.image.id}`
                        : defaultImage
                    }
                    alt="KÉP HELYE"
                  />
                  <div className="cont__text">
                    <h1>{r.name ? r.name.substring(0, 25) : 'loading'}</h1>

                    <p>
                      {r.description
                        ? r.description.substring(0, 250)
                        : 'loading'}
                    </p>
                    {/*meg kell számolni hány kerekter leirás fér ki rendesen */}
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
    </div>
  );
}

export default SearchResult;
