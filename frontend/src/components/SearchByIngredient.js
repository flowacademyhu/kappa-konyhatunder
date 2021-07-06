import { useEffect, useState } from 'react';
import SearchResult from './SearchResult';
import { getIngredient } from './apiCalls';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';

const StyledTitle = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: xx-large;
  color: #2e850b;

  font-family: 'Charmonman', cursive !important;
`;

const StyledSmallerTitle = styled.div`
  font-size: xx-large;
  color: #1e5707;
  text-align: center;
  font-family: 'Charmonman', cursive !important;
  margin-top: 15px;
  margin-left: 20px;
  margin-bottom: 30px;
  text-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
`;

const LeftSide = styled.div`
  display: flex;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 80px;
  grid-template-columns: 225px 100px;
  width: 300px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
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
  padding: 10px, 10px, 10px, 10px;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
  grid-template-columns: 225px 100px;
  margin-right: 20px;
  margin-left: 20px;
  padding: 10px;
`;

const ListItems = styled.div`
  font-size: x-large;
  color: #1e5707;
  margin-left: 50px;
  text-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
`;

const List = styled.div`
  margin-top: 20px;
  overflow: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background-color: #faedb9;
  }
`;

const RecipesTitle = styled.div`
  margin-top: 30px;
  font-size: xx-large;
  color: #1e5707;
  text-align: center;
  font-family: 'Charmonman', cursive !important;
`;
const Line = styled.hr`
  border: none;
  height: 20px;
  width: 90%;
  height: 50px;
  margin-top: 0;
  border-bottom: 1px solid #2e860b00;
  box-shadow: 0 20px 20px -20px #174405c9;
  margin: -50px auto 10px;
`;

function SearchByIngredient() {
  const [ingredientsList, setIngredientsList] = useState();
  const [chosenIngredient, setChosenIngredient] = useState('');
  const [ingredientsArray, setIngredientsArray] = useState([]);

  useEffect(() => {
    const loadingData = async () => {
      setIngredientsList(await getIngredient());
    };
    loadingData();
  }, []);

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
                    {ingredientsList.sort((a, b) =>
                      a.name.localeCompare(b.name)
                    ) &&
                      ingredientsList.map((chosenIngredient) => (
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
                    onClick={() =>
                      chosenIngredient
                        ? (setIngredientsList(
                            ingredientsList.filter(
                              (ingredientItem) =>
                                ingredientItem.id !==
                                JSON.parse(chosenIngredient).id
                            )
                          ),
                          setIngredientsArray([
                            ...ingredientsArray,
                            JSON.parse(chosenIngredient),
                          ]),
                          setChosenIngredient(''))
                        : ''
                    }
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
        <RightSide>
          {ingredientsArray ? (
            <>
              <StyledSmallerTitle>
                A keresett hozzávalók listája :
              </StyledSmallerTitle>
              <List>
                {ingredientsArray.map((chosenIngredient) => (
                  <ListItems key={chosenIngredient.id}>
                    <Row className="justify-content-space-between">
                      <Col>
                        <> - {chosenIngredient.name} </>
                      </Col>
                    </Row>
                  </ListItems>
                ))}
              </List>
            </>
          ) : (
            <div>Loading List... </div>
          )}
        </RightSide>
      </Row>
      <Col>
        <RecipesTitle>Keresés eredménye</RecipesTitle>
        <Line />
        <SearchResult ingredients={ingredientsArray} searchBy={'ingredients'} />
      </Col>
    </div>
  );
}

export default SearchByIngredient;
