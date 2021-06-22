import { useFormik } from 'formik';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { validationSchema } from './ValidationSchema';
import Modal from './Modal';

const AddRecipeForm = () => {
  const [status, setStatus] = useState('Sikertelen hozzáadás');

  async function addRecipe(values) {
    const data = {
      name: values.name,
      description: values.description,
      preparationTime: values.preparationTime,
      level: values.level,
      categoryList: values.categoryList,
    };

    try {
      await axios.post(`/api/recipes`, data);
      setStatus('Sikeres hozzáadás!');
    } catch (error) {
      setStatus('Sikertelen hozzáadás');
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      preparationTime: 0,
      level: 'EASY',
      categoryList: [],
    },
    validationSchema,

    onSubmit: (values) => {
      addRecipe(values);
      console.log(values);
    },
  });

  const [levels, setLevels] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    async function functionName() {
      try {
        const response = await axios.get(`api/recipes/levels`);
        setLevels(response.data);
        return response.data;
      } catch (error) {
        console.error();
      }
    }
    functionName();
  }, []);

  useEffect(() => {
    async function categoryFunction() {
      try {
        const response = await axios.get(`/api/categories`);

        console.log(response.data);
        setCategoryList(response.data);

        return response.data;
      } catch (error) {
        console.error();
      }
    }
    categoryFunction();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container">
        <span className="text-danger">★</span>

        <label className="mt-2" htmlFor="name">
          Recept neve
        </label>
        <input
          className="form-control"
          id="name"
          type="text"
          {...formik.getFieldProps('name')}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-danger">{formik.errors.name}</div>
        ) : null}
        <span className="text-danger">★</span>
        <label className="mt-2" htmlFor="long">
          Elkészítés
        </label>
        <textarea
          className="form-control"
          id="description"
          type="text"
          {...formik.getFieldProps('description')}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="text-danger">{formik.errors.description}</div>
        ) : null}
        <span className="text-danger">★</span>
        <label className="mt-2" htmlFor="preparationTime">
          Elkészítési idő (percben)
        </label>

        <input
          className="form-control"
          id="preparationTime"
          type="number"
          {...formik.getFieldProps('preparationTime')}
        />
        {formik.touched.preparationTime && formik.errors.preparationTime ? (
          <div className="text-danger">{formik.errors.preparationTime}</div>
        ) : null}
        <div className="form-group">
          <label className="mt-2" htmlFor="level">
            Nehézség
          </label>
          <select
            className="form-control"
            name="level"
            {...formik.getFieldProps('level')}
          >
            {levels.map((l) => (
              <option key={l} value={l}>
                {l === 'EASY' ? 'Könnyű' : l === 'MEDIUM' ? 'Közepes' : 'Nehéz'}
              </option>
            ))}
          </select>
          <p className="mt-2">Kategória választás:</p>
          <div className="container">
            <div className="row">
              {categoryList.map((l) => (
                <div key={l.name}>
                  <input
                    type="checkbox"
                    id={l.name}
                    name={l.name}
                    className="mr-2 ml-2"
                    {...formik.getFieldProps('categoryList')}
                    value={l.name}
                  />
                  <label htmlFor={l.name}>{l.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className="btn btn-success"
          type="submit"
          data-toggle="modal"
          data-target="#myModal"
        >
          Hozzáadás
        </button>

        <Modal status={status} />
      </div>
    </form>
  );
};

export default AddRecipeForm;
