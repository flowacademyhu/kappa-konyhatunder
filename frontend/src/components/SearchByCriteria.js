import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { getLevels, getCategorys } from './apiCalls';
import { Link } from 'react-router-dom';
import '../styles/Search.css';
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
        <h3 className="myFormTitle"> Keresés kritérium alapján </h3>
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
              <div>
                <h3 className="myFormTitle">A recept neve </h3>
                <Field
                  className="col form-control-lg"
                  type="text"
                  name="name"
                  placeholder="Csilis bab"
                />
              </div>
              <div className="mt-4 col">
                <h3 className="myFormTitle">Nehézség </h3>
                <Field
                  className="col custom-select-lg"
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
              <div className="form-control mt-5" id="my-radio-group">
                <h3 className="myFormTitle">Elkészítés idő </h3>
                <div
                  className="row"
                  role="group"
                  aria-labelledby="my-radio-group"
                >
                  {times.map((time) => (
                    <div className="col-4" key={time}>
                      <Field type="radio" name="preparationTime" value={time} />
                      {time - 30} - {time - 1} perc
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div role="group" aria-labelledby="checkbox-group">
                  <h3 className="myFormTitle">Kategóriák </h3>
                  <div
                    className="row"
                    role="group"
                    aria-labelledby="categories"
                  >
                    {categoryList.map((l) => (
                      <div className="col-2" htmlFor={l.name}>
                        {l.name}
                        <div>
                          <Field
                            type="checkbox"
                            name="categories"
                            value={l.name}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="">
                <h5 className="mt-5">
                  Legyen kép a receptről?
                  <Field className="" type="checkbox" name="picture" />
                </h5>
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
