import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { getLevels, getCategorys } from './apiCalls';
import { Link } from 'react-router-dom';

function SearchByCriteria() {
  useEffect(() => {
    const getInitData = async () => {
      setCategoryList(await getCategorys());
      setLevels(await getLevels());
    };
    getInitData();
  }, []);
  const times = ['30', '60', '120', '180', '240'];
  const [categoryList, setCategoryList] = useState([]);
  const [levels, setLevels] = useState([]);

  return (
    <>
      <div className="container mt-4 align-items-center justify-content-between">
        Keresés kritérium alapján
        <Formik
          initialValues={{
            name: '',
            preparationTime: '',
            difficulty: '',
            categories: [],
            picture: false,
          }}
        >
          {({ values }) => (
            <Form>
              <div className="row  align-items-center justify-content-between ">
                <div className="col-10 justify-content-between ">
                  <label>
                    {' '}
                    A recept neve
                    <Field type="text" name="name" />
                  </label>
                  <label>
                    {' '}
                    A nehézség
                    <Field as="select" required name="difficulty">
                      {levels
                        ? levels.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))
                        : 'loading'}
                    </Field>
                  </label>
                  <div className="col-6 " id="my-radio-group">
                    Elkészítés idő
                  </div>
                  <div
                    className="form-control"
                    role="group"
                    aria-labelledby="my-radio-group"
                  >
                    {times.map((time) => (
                      <label className="col-4" key={time}>
                        <Field
                          type="radio"
                          name="preparationTime"
                          value={time}
                        />
                        {time - 30} - {time - 1} perc
                      </label>
                    ))}
                  </div>

                  <div role="group" aria-labelledby="checkbox-group">
                    <div id="checkbox-group">categories</div>
                    <div
                      className="form-control"
                      role="group"
                      aria-labelledby="categories"
                    >
                      {categoryList.map((l) => (
                        <>
                          <Field
                            type="checkbox"
                            name="categories"
                            className="mr-2 ml-2"
                            value={l.name}
                          />
                          <label htmlFor={l.name}>{l.name}</label>
                        </>
                      ))}
                    </div>
                  </div>
                  <label>
                    <Field
                      className="form-control"
                      type="checkbox"
                      name="picture"
                    />
                    Legyen kép a receptről?
                  </label>
                </div>
              </div>
              <Link
                className="btn btn-success mt-3"
                type="submit"
                to={{
                  pathname: '/searchResultByCriteria',
                  state: { values: values },
                }}
              >
                Keresés...
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default SearchByCriteria;
