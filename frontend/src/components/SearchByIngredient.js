import { useEffect, useState } from 'react';
import SearchResultForMobile from './SearchResultForMobile';
import SearchResult from './SearchResult';
import { useMediaQuery } from 'react-responsive';
import { getIngredient } from './apiCalls';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';
import background from '../images/background.png';

function SearchByIngredient() {
  const [ingredientsList, setIngredientsList] = useState();
  const [chosenIngredient, setChosenIngredient] = useState('');
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const isMobile = useMediaQuery({ query: `(max-width: 576px)` });

  useEffect(() => {
    const loadingData = async () => {
      setIngredientsList(await getIngredient());
    };
    loadingData();
  }, []);

  const StyledTitle = styled.h3`
    margin-top: 50px;
    margin-bottom: 20px;
    font-size: xx-large;
    color: #2e850b;

    font-family: 'Charmonman', cursive !important;
  `;

  const StyledSmallerTitle = styled.h3`
    font-size: xx-large;
    color: #1e5707;
    text-align: center;
    font-family: 'Charmonman', cursive !important;
    margin-top: 15px;
    margin-left: 20px;
    margin-bottom: 30px;
    text-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
  `;

  const LeftSide = styled.h3`
    display: flex;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 80px;
    grid-template-columns: 225px 100px;
    width: 300px;
  `;

  const RightSide = styled.h3`
    display: flex;
    background-image: linear-gradient(
      0deg,
      #fffbc4 45.45%,
      #ebe7b0 45.45%,
      #ebe7b0 50%,
      #fffbc4 50%,
      #fffbc4 95.45%,
      #ebe7b0 95.45%,
      #ebe7b0 100%
    );
    background-size: 22px 22px;
    height: 400px;
    width: 600px;
    margin-left: 100px;
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
    margin-top: 40px;
  `;

  const ListItems = styled.h3`
    font-size: x-large;
    color: #1e5707;
    margin-left: 50px;
    text-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
  `;

  const List = styled.h3`
    margin-top: 20px;
  `;

  return (
    <div className="container">
      <Row>
        <Col>
          <StyledTitle className="title">Keresés hozzávaló alapján</StyledTitle>
          <LeftSide>
            {ingredientsList ? (
              <>
                <div className="col-sm-10 mt-4">
                  <select
                    className="form-control"
                    name="chosenIngredient"
                    id="data"
                    onChange={(e) => {
                      setChosenIngredient(e.target.value);
                    }}
                  >
                    <option>Hozzávaló neve</option>
                    {ingredientsList.map((chosenIngredient) => (
                      <option
                        key={chosenIngredient.id}
                        value={JSON.stringify(chosenIngredient)}
                      >
                        {chosenIngredient.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-sm-6">
                  <button
                    className="btn btn-success mt-4"
                    onClick={() => {
                      setIngredientsArray([
                        ...ingredientsArray,
                        JSON.parse(chosenIngredient),
                      ]);
                      setIngredientsList(
                        ingredientsList.filter(
                          (ingredientItem) =>
                            ingredientItem.id !==
                            JSON.parse(chosenIngredient).id
                        )
                      );
                    }}
                    type="button"
                  >
                    Hozzáadás
                  </button>
                </div>
              </>
            ) : (
              <div>'Loading List...' </div>
            )}
          </LeftSide>
        </Col>
        <Col>
          <RightSide>
            {ingredientsArray ? (
              <List>
                <StyledSmallerTitle>
                  A keresett hozzávalók listája :
                </StyledSmallerTitle>
                {ingredientsArray.map((chosenIngredient) => (
                  <ListItems key={chosenIngredient.id}>
                    <> - {chosenIngredient.name} </>
                  </ListItems>
                ))}
              </List>
            ) : (
              <div>Loading List... </div>
            )}
          </RightSide>
        </Col>
      </Row>

      <Col>
        {isMobile ? (
          <SearchResultForMobile
            ingredients={ingredientsArray}
            searchBy={'ingredients'}
          />
        ) : (
          <SearchResult
            ingredients={ingredientsArray}
            searchBy={'ingredients'}
          />
        )}
      </Col>
    </div>
  );
}

export default SearchByIngredient;
