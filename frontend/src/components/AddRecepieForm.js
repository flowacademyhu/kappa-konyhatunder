import { useFormik } from 'formik';
import axios from 'axios';
import { useEffect, useState } from 'react';

const userAPI = axios.create({
  baseURL: 'http://localhost:8081/api/',
});

const AddRecepieForm = () => {
  async function addRecipe(values) {
    const data = {
      name: values.name,
      description: values.description,
      preparationTime: values.preparationTime,
      level: values.level,
      categoryList: values.categoryList,
    };

    try {
      await axios.post(`http://localhost:8081/api/recipes`, data);
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      preparationTime: 0,
      level: '',
      categoryList: [],
    },

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
        const response = await userAPI.get(`recipes/levels`);

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
        const response = await userAPI.get(`/categories`);

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
        <label htmlFor="name">Név</label>
        <input
          className="form-control"
          id="name"
          type="text"
          {...formik.getFieldProps('name')}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <label htmlFor="long">Leírás</label>
        <input
          className="form-control"
          id="description"
          type="text"
          {...formik.getFieldProps('description')}
        />
        {formik.touched.description && formik.errors.description ? (
          <div>{formik.errors.description}</div>
        ) : null}

        <label htmlFor="preparationTime">Elkészítési idő (percben)</label>

        <input
          className="form-control"
          id="preparationTime"
          type="number"
          {...formik.getFieldProps('preparationTime')}
        />
        {formik.touched.preparationTime && formik.errors.preparationTime ? (
          <div>{formik.errors.preparationTime}</div>
        ) : null}
        <div className="form-group">
          <label htmlFor="level">Nehézség</label>
          <select
            className="form-control"
            name="level"
            {...formik.getFieldProps('level')}
          >
            {levels.map((l) => (
              <option key={l} value={l}>
                {l.charAt(0) + l.substring(1).toLowerCase()}
              </option>
            ))}
          </select>

          <div>
            {categoryList.map((l) => (
              <div key={l.name}>
                <input
                  type="checkbox"
                  id={l.name}
                  name={l.name}
                  {...formik.getFieldProps('categoryList')}
                  value={l.name}
                />
                <label htmlFor={l.name}>{l.name}</label>
              </div>
            ))}
          </div>
        </div>

        <button className="btn btn-success" type="submit">
          Hozzáadás
        </button>
      </div>
    </form>
  );
};

export default AddRecepieForm;
