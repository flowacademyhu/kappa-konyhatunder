import { useFormik } from 'formik';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { validationSchema } from './ValidationSchema';
import Modal from './Modal';

const AddRecipeForm = () => {
  const [status, setStatus] = useState('Sikertelen hozzáadás');
  const [levels, setLevels] = useState([]);
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [newIngredientType, setNewIngredientType] = useState('-');
  const [categoryList, setCategoryList] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [newIngredientsList, setNewIngredientsList] = useState([]);
  const [newIngredientTypeList, setNewIngredientTypeList] = useState([]);

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
      amountOfIngredientForARecipeList: values.amountOfIngredientForARecipeList,
    };
    const data2 = {
      ...data,
      amountOfIngredientForARecipeList: newIngredientsList,
    };
    try {
      await axios.post(`/api/recipes`, data2);
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
      amountOfIngredientForARecipeList: [],
      categoryList: [],
    },
    validationSchema,

    onSubmit: (values) => {
      addRecipe(values);
    },
  });

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
        setCategoryList(response.data);
        return response.data;
      } catch (error) {
        console.error();
      }
    }
    categoryFunction();
  }, [newCategory]);

  async function getIngredienTypeFunction(newIngredientString) {
    const newIngredientObject = JSON.parse(newIngredientString);
    console.log(ingredientsList);
    try {
      const response = await axios.get(
        `/api/ingredients/${newIngredientObject.id}`
      );
      setNewIngredient(newIngredientObject);
      console.log(response.data);

      setNewIngredientTypeList(response.data.typeList);
      return response.data.typeList;
    } catch (error) {
      console.error();
    }
  }

  useEffect(() => {
    async function ingredientFunction() {
      try {
        const response = await axios.get(`/api/ingredients`);
        setIngredientsList(response.data);
        return response.data;
      } catch (error) {
        console.error();
      }
    }
    ingredientFunction();
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
                {l}
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
              <div className="col-4">
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
                data-target="#recipeStatusModal"
                type="button"
              >
                +
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <p className="col-2 mt-2 pl-0 d-flex align-items-center">
              Hozzávaló hozzáadása
            </p>
            <div className="col-4">
              <p>hozzávaló</p>
              <select
                className="form-control"
                name="ingredient"
                onChange={(e) => getIngredienTypeFunction(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Choose here
                </option>
                {ingredientsList.map((l) => (
                  <option key={l.id} value={JSON.stringify(l)}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-2">
              <p>mértékegység</p>
              <select
                className="form-control"
                name="ingredientType"
                onChange={(e) => setNewIngredientType(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Choose here
                </option>
                {newIngredientTypeList.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-3">
              <p>mennyiség</p>
              <input
                className="form-control"
                id="amount"
                type="text"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
              />
            </div>
            <button
              className="btn btn-success"
              onClick={() => {
                setNewIngredientsList([
                  ...newIngredientsList,
                  {
                    ingredient: newIngredient,
                    unit: newIngredientType,
                    amount: newAmount,
                  },
                ]);
                console.log(newIngredientsList);
              }}
              type="button"
            >
              +
            </button>
          </div>
        </div>

        <button
          className="btn btn-success"
          type="submit"
          data-toggle="modal"
          data-target="#recipeStatusModal"
        >
          Hozzáadás
        </button>

        <Modal status={status} id="recipeStatusModal" />
      </div>
    </form>
  );
};

export default AddRecipeForm;
