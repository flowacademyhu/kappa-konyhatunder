import { useFormik } from 'formik';
import axios from 'axios';
import { useEffect, useState } from 'react';

const showAlert = () => {
  alert('Sikeres küldés!');
};

const AddRecipeForm = () => {
  const [newCategory, setNewCategory] = useState('');
  const [status, setStatus] = useState('');
  async function addCategory(value) {
    if (value === '') {
      setStatus('Kategória megadása kötelező!');
      return;
    }
    const data = {
      name: value,
    };

    try {
      await axios.post(`/api/categories`, data);
      setStatus('Sikeres hozzáadás!');
    } catch (error) {
      console.log(error.response);
      setStatus(error.response.data[0]);
    }
    setNewCategory('');
  }

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
      showAlert();
    } catch (error) {
      console.error(error);
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

    onSubmit: (values) => {
      addRecipe(values);
      console.log(values);
    },
  });

  const [levels, setLevels] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    async function levelFunction() {
      try {

        const response = await axios.get(`/api/recipes/levels`);


        setLevels(response.data);

        return response.data;
      } catch (error) {
        console.error();
      }
    }
    levelFunction();
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
  }, [categoryList]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container">
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
          <div>{formik.errors.name}</div>
        ) : null}

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
          <div>{formik.errors.description}</div>
        ) : null}

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
          <div>{formik.errors.preparationTime}</div>
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
            <div className="d-flex align-items-center">
              <p className="col-2 mt-2 pl-0 d-flex align-items-center">
                Kategória hozzáadása
              </p>
              <div className="col-6">
                <input
                  className="form-control"
                  id="newCategory"
                  value={newCategory}
                  type="text"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
              <button
                className="btn btn-success"
                onClick={() => addCategory(newCategory)}
                data-toggle="modal"
                data-target="#myModal"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <button className="btn btn-success" type="submit">
          Hozzáadás
        </button>
        <div className="modal fade" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Konyhatündér üzenet</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div className="modal-body">{status}</div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Bezárás
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddRecipeForm;
