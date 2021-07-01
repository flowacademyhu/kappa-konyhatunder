import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { getLevels, getCategorys } from './apiCalls';
import styled from 'styled-components';
import Modal from './Modal';
import axios from 'axios';

const times = ['30', '60', '120', '180', '240', '300'];

const StyledTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: xx-large;
  color: #2e850b;

  font-family: 'Charmonman', cursive !important;
`;

function SearchByCriteria() {
  useEffect(() => {
    const getInitData = async () => {
      setCategoryList(await getCategorys());
      setLevels(await getLevels());
    };
    getInitData();
  }, []);

  const searchByValues = async (values) => {
    const data = {
      ...values,
      preparationTimeInterval:
        values.preparationTimeInterval === null
          ? values.preparationTimeInterval
          : values.preparationTimeInterval < 300
          ? [
              values.preparationTimeInterval > 60
                ? values.preparationTimeInterval - 60
                : values.preparationTimeInterval - 30,
              values.preparationTimeInterval,
            ]
          : [values.preparationTimeInterval, 999],
    };

    try {
      const response = await axios.post('/api/recipes/search/criteria', data);
      if (response.data !== null) {
        setStatus('Sikeres keresés');
        setRecipes(response.data);
      } else {
        setStatus('sikertelen keresés');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [categoryList, setCategoryList] = useState([]);
  const [levels, setLevels] = useState([]);
  const [status, setStatus] = useState('Sikertelen keresés');
  const [recipes, setRecipes] = useState([]);
  return (
    <>
      <div className="container mt-4 align-items-center justify-content-between">
        <StyledTitle className="myFormTitle">
          Keresés kritérium alapján
        </StyledTitle>
        <Formik
          initialValues={{
            name: null,
            preparationTimeInterval: null,
            difficulty: null,
            categories: null,
            hasPicture: null,
          }}
        >
          {({ values }) => (
            <Form>
              <div className="row">
                <div className="mt-4  col-lg-8">
                  <StyledTitle className="myFormTitle">
                    A recept neve
                  </StyledTitle>
                  <Field
                    className="form-control-lg col w-100"
                    type="text"
                    name="name"
                    placeholder="Csilis bab"
                  />
                </div>
                <div className="mt-4 col ">
                  <StyledTitle className="myFormTitle">Nehézség </StyledTitle>
                  <Field
                    className=" custom-select-lg col"
                    as="select"
                    required
                    name="difficulty"
                  >
                    {levels
                      ? levels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))
                      : 'loading'}
                  </Field>
                </div>
              </div>

              <div className="form-control mt-5" id="my-radio-group">
                <StyledTitle className="myFormTitle">
                  Elkészítés idő
                </StyledTitle>
                <div
                  className="row"
                  role="group"
                  aria-labelledby="my-radio-group"
                >
                  {times.map((time) => (
                    <div className="col-4" key={time}>
                      <Field
                        className="mr-4"
                        type="radio"
                        name="preparationTimeInterval"
                        value={time}
                      />
                      {time < 300 ? (time < 61 ? time - 30 : time - 60) : 300}{' '}
                      {time < 300 ? '-' : '+'}
                      {time < 300 ? time : ''} perc
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div role="group" aria-labelledby="checkbox-group">
                  <StyledTitle className="myFormTitle">Kategóriák </StyledTitle>
                  <div
                    className="row"
                    role="group"
                    aria-labelledby="categories"
                  >
                    {categoryList.map((category) => (
                      <>
                        <div>
                          <Field
                            className="mx-4"
                            type="checkbox"
                            name="categories"
                            value={category.name}
                          />
                        </div>
                        <div
                          className=""
                          htmlFor={category.name}
                          key={category.name}
                        ></div>
                        {category.name}
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div className="">
                <h5 className="mt-5">
                  Legyen kép a receptről?
                  <Field className="ml-5" type="checkbox" name="picture" />
                </h5>
              </div>
              <button
                className="btn btn-success"
                data-toggle="modal"
                data-target="#criteriaStatusModal"
                onClick={() => searchByValues(values)}
                type="submit"
              >
                Keresés...
              </button>
              <Modal status={status} id="criteriaStatusModal" />
            </Form>
          )}
        </Formik>

        {recipes ? (
          <ul className="list-group">
            {recipes.map((recipe) => (
              <li
                key={recipe.id}
                className="list-group-item list-group-item-action"
              >
                <div>{recipe.name}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div>'Loading List...' </div>
        )}
      </div>
    </>
  );
}

export default SearchByCriteria;
