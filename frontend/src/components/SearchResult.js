import { Col, Row } from 'react-bootstrap';
import defaultImage from '../images/defaultimage.png';
import '../styles/SearchResult.css';
import { IoIosAlarm } from 'react-icons/io';
import { IoBarbellSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { getRecipesWithMatchingIngredients } from './apiCalls';
import { Link } from 'react-router-dom';

function SearchResult({ ingredients, searchBy }) {
  const [recipe, setRecipe] = useState([]);

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
  };

  useEffect(() => {
    const getRecipes = async () => {
      const recipeList = await getRecipesWithMatchingIngredients(
        ingredients,
        searchBy
      );
      recipeList
        ? recipeList.sort((a, b) => a.name.localeCompare(b.name))
        : console.log('Loading');
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
            ? recipe.map((recipe) => (
                <div className="cont" key={recipe.id}>
                  <img
                    src={
                      recipe.image.fileName === 'defaultImage'
                        ? defaultImage
                        : `/api/image/${recipe.image.id}`
                    }
                    alt="Kép a receptről"
                  />
                  <div className="cont__text">
                    <h1>{recipe.name}</h1>

                    <p>{recipe.description}</p>
                    <div className="cont__text__timing">
                      <div className="cont__text__timing_time">
                        <div>
                          <div className="cardIcon">
                            <IoIosAlarm />
                          </div>
                          <div className="time">
                            {recipe.preparationTime} perc
                          </div>
                        </div>
                      </div>
                      <div className="cont__text__timing_time">
                        <div>
                          <div className="cardIcon">
                            <IoBarbellSharp />
                          </div>
                          <p>{recipe.difficulty}</p>
                        </div>
                      </div>
                    </div>
                    <button className="btn">
                      <Link
                        to={`/recipes/${recipe.id}`}
                        key={recipe.id}
                        style={linkStyle}
                      >
                        <i className="fa fa-arrow-right">Elkészítem !</i>
                      </Link>
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
