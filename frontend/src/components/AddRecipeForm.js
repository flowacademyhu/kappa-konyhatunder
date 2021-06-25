import { useFormik } from 'formik';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { validationSchema } from './ValidationSchema';
import Modal from './Modal';
import IngredientsInRecipeList from './IngredientsInRecipeList';
import '../styles/AddRecipeForm.css';
import { saveNewIngredient } from './apiCalls';
import { translateIngredient } from './transleteIngredientsMeasurement';

const AddRecipeForm = () => {
  const [status, setStatus] = useState('Sikertelen hozzáadás');
  const [levels, setLevels] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [newIngredientType, setNewIngredientType] = useState('-');
  const [categoryList, setCategoryList] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [newIngredientsList, setNewIngredientsList] = useState([]);
  const [newIngredientTypeList, setNewIngredientTypeList] = useState([]);
  const [addNewIngredient, setAddNewIngredient] = useState('');
  const [ingredientTypeList, setIngredientTypeList] = useState([]);
  const [addNewAmount, setAddNewAmount] = useState('');
  const [ingredientTypeFromUser, setIngredientTypeFromUser] = useState('-');
  const [baseMeasurementForNewIngredient, setBaseMeasurementForNewIngredient] =
    useState('');
  const [newMeasurement, setNewMeasurement] = useState([]);

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
      setStatus('Sikertelen hozzáadás');
    }
    setCategory('');
  }

  async function addRecipe(values) {
    const data = {
      name: values.name,
      description: values.description,
      preparationTime: values.preparationTime,
      difficulty: values.level,
      categories: values.categoryList,
      ingredients: values.ingredients,
    };
    const data2 = {
      ...data,
      ingredients: newIngredientsList,
    };

    try {
      await axios.post(`/api/recipes`, data2);
    } catch (error) {
      console.error(error);
      setStatus('Sikertelen hozzáadás');
    }
    setStatus('Sikeres hozzáadás');
  }

  useEffect(() => {
    async function ingredientTypeFunction() {
      try {
        const response = await axios.get(`/api/ingredients/measurements`);

        setIngredientTypeList(response.data);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error();
      }
    }
    ingredientTypeFunction();
  }, []);

  const getMeasurements = async (baseMeasurement) => {
    try {
      const response = await axios.get(
        `/api/ingredients/measurements/${baseMeasurement}`
      );
      setBaseMeasurementForNewIngredient(baseMeasurement);
      setNewMeasurement(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error();
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      preparationTime: 0,
      level: 'Könnyű',
      ingredients: [],
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
        console.error(error);
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
        console.error(error);
      }
    }
    categoryFunction();
  }, [category]);

  async function getIngredienTypeFunction(newIngredientString) {
    const newIngredientObject = JSON.parse(newIngredientString);

    try {
      const response = await axios.get(
        `/api/ingredients/${newIngredientObject.id}`
      );

      setIngredient(newIngredientObject);

      setNewIngredientTypeList(response.data.measurements);

      //return response.data.measurements;
    } catch (error) {
      console.error(error);
    }
  }
  //
  const sendNewIngredient = async (
    addNewIngredient,
    ingredientTypeFromUser,
    addNewAmount
  ) => {
    const ingrid = await saveNewIngredient(
      addNewIngredient,
      baseMeasurementForNewIngredient
    );

    setNewIngredientsList([
      ...newIngredientsList,
      {
        ingredient: ingrid,
        unit: ingredientTypeFromUser,
        amount: addNewAmount,
      },
    ]);
    console.log(newIngredientsList);
  };

  useEffect(() => {
    async function ingredientFunction() {
      try {
        const response = await axios.get(`/api/ingredients`);

        setIngredientsList(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
    ingredientFunction();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="formTitle">Új recept hozzáadása</div>
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
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
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
            <label className="mt-2" htmlFor="long">
              Kategória hozzáadása
            </label>
            <div className="row align-items-center justify-content-between">
              <div className="col-4">
                <input
                  className="form-control"
                  id="category"
                  value={category}
                  type="text"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <button
                className="btn btn-success"
                onClick={() => addCategory(category)}
                data-toggle="modal"
                data-target="#recipeStatusModal"
                type="button"
              >
                +
              </button>
            </div>
          </div>
          <label className="mt-2" htmlFor="long">
            Hozzávaló hozzáadása
          </label>
          <div className="row align-items-center justify-content-between">
            <div className="col-4">
              <select
                className="form-control"
                name="ingredient"
                defaultValue={'DEFAULT'}
                onChange={(e) => getIngredienTypeFunction(e.target.value)}
              >
                <option value="DEFAULT" disabled>
                  Hozzávaló neve
                </option>
                {ingredientsList.map((l) => (
                  <option key={l.id} value={JSON.stringify(l)}>
                    {translateIngredient(l.name, l.measurement)}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-2">
              <select
                className="form-control"
                name="ingredientType"
                defaultValue={'DEFAULT'}
                onChange={(e) => setNewIngredientType(e.target.value)}
              >
                <option value="DEFAULT" disabled>
                  Mértékegység
                </option>
                {newIngredientTypeList.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-3">
              <input
                className="form-control"
                id="amount"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Mennyiség"
              />
            </div>
            <div className="col">
              <button
                className="btn btn-success"
                data-toggle="modal"
                data-target="#ringredientStatusModal"
                onClick={() => {
                  setNewIngredientsList([
                    ...newIngredientsList,
                    {
                      ingredient: ingredient,
                      unit: newIngredientType,
                      amount: amount,
                    },
                  ]);
                }}
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {
          <div className="d-flex align-items-center">
            <p className="col-2 mt-2 pl-0 d-flex align-items-center">
              {' '}
              Új hozzávaló megadása
            </p>
            <div className="col-5">
              <input
                className="form-control"
                id="addNewIngredient"
                type="text"
                onChange={(e) => setAddNewIngredient(e.target.value)}
                placeholder="Adja meg a hozzávaló nevét"
              />
            </div>

            <div className="col-2">
              <select
                className="form-control"
                name="ingredientType"
                onChange={(e) => getMeasurements(e.target.value)}
              >
                <option value="">Alapegység</option>
                {ingredientTypeList.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-2">
              <select
                className="form-control"
                name="ingredientType"
                onChange={(e) => setIngredientTypeFromUser(e.target.value)}
              >
                <option value="">Mértékegység megadása</option>
                {newMeasurement.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-3">
              <input
                className="form-control"
                id="addNewAmount"
                type="text"
                value={addNewAmount}
                onChange={(e) => setAddNewAmount(e.target.value)}
                placeholder="Adja meg a mennyiséget"
              />
            </div>

            <button
              className="btn btn-success"
              onClick={() => {
                sendNewIngredient(
                  addNewIngredient,
                  ingredientTypeFromUser,
                  addNewAmount
                );
              }}
              type="button"
            >
              +
            </button>
          </div>
        }

        <IngredientsInRecipeList ingredientsList={newIngredientsList} />
        <button
          className="btn btn-success"
          type="submit"
          data-toggle="modal"
          data-target="#recipeStatusModal"
        >
          Hozzáadás
        </button>
        <Modal status={status} id="recipeStatusModal" />
        <Modal status={status} id="ingredientStatusModal" />
      </div>
    </form>
  );
};

export default AddRecipeForm;
