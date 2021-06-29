import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { getLevels, getCategorys } from './apiCalls';

function SearchByCriteria() {
  return (
    <>
      <div>Keresés kritérium alapján</div>
      <Formik
        initialValues={{ name: '', picture: false }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="name" />

            <label>
              <Field type="checkbox" name="picture" />
              kép?
            </label>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default SearchByCriteria;
