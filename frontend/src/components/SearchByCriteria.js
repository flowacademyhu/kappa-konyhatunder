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

  const [categoryList, setCategoryList] = useState([]);
  const [levels, setLevels] = useState([]);
  const [criteriasArray, setCriteriasArray] = useState({});
  return (
    <>
      <div className="container">
        Keresés kritérium alapján
        <Formik
          initialValues={{
            name: '',
            preparationTime: '',
            difficulty: '',
            categories: [],

            picture: false,
          }}
          onSubmit={(values) => {
            console.log(values);
            setCriteriasArray(...values);
            console.log(criteriasArray);
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
            <Form>
              <Field type="text" name="name" />

              <div className="row" id="my-radio-group">
                Elkészítés idő
              </div>
              <div role="group" aria-labelledby="my-radio-group">
                <label>
                  <Field type="radio" name="preparationTime" value="30" />
                  30 nál kevesebb
                </label>
                <label>
                  <Field type="radio" name="preparationTime" value="60" />
                  30-59
                </label>
                <label>
                  <Field type="radio" name="preparationTime" value="120" />
                  60-119
                </label>
                <label>
                  <Field type="radio" name="preparationTime" value="180" />
                  120-179
                </label>
                <label>
                  <Field type="radio" name="preparationTime" value="181" />
                  180
                </label>
              </div>

              <Field as="select" required name="difficulty">
                <option disabled></option>
                {levels
                  ? levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))
                  : 'loading'}
              </Field>

              <div role="group" aria-labelledby="checkbox-group">
                <div id="checkbox-group">categories</div>
                <div role="group" aria-labelledby="categories">
                  {categoryList.map((l) => (
                    <>
                      <Field
                        type="checkbox"
                        name="categories"
                        className="mr-2 ml-2"
                        value={l.name}
                        key={l.name}
                      />
                      <label htmlFor={l.name}>{l.name}</label>
                    </>
                  ))}
                </div>
              </div>
              <label>
                <Field type="checkbox" name="picture" />
                kép?
              </label>
              <br></br>
              {/**   <button type="submit">Submit</button> */}
              <Link
                className="btn btn-success mt-3"
                type="submit"
                onClick={() => {
                  console.log(values);
                }}
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
