import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { getCategorys } from './apiCalls';

function SearchByCriteria() {
  useEffect(() => {
    const getInitData = async () => {
      setCategoryList(await getCategorys());
    };
    getInitData();
  }, []);

  const [categoryList, setCategoryList] = useState([]);

  return (
    <>
      <div>Keresés kritérium alapján</div>
      <Formik
        initialValues={{ name: '', categories: [], picture: false }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="name" />
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
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default SearchByCriteria;
