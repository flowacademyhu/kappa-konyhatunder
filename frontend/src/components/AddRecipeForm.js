import { useFormik } from 'formik';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { validationSchema } from './ValidationSchema';
import Modal from './Modal';
import IngredientsInRecipeList from './IngredientsInRecipeList';
import '../styles/AddRecipeForm.css';
import {
  saveNewIngredient,
  addRecipe,
  addNewCategory,
  getNewIngredientBaseMeasurements,
  getLevels,
  getCategorys,
  getIngredient,
} from './apiCalls';
import { translateIngredient } from './transleteIngredientsMeasurement';
import NoImageSelectedModal from './NoImageSelectedModal';

const AddRecipeForm = () => {
  const [formValuesForModal, setFormValuesForModal] = useState('');
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
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  async function addCategory(value) {
    if (value === '') {
      setStatus('Kategória megadása kötelező!');
      return;
    }
    setCategoryList([...categoryList, { name: value }]);
    addNewCategory(value)
      ? setStatus('Sikeres hozzáadás!')
      : setStatus('Sikertelen hozzáadás');
    setCategory('');
  }

  const addIngredientToRecipe = () => {
    setNewIngredientsList([
      ...newIngredientsList,
      {
        ingredient: ingredient,
        unit: newIngredientType,
        amount: amount,
      },
    ]);
    setAmount('');
    setIngredientsList(
      ingredientsList.filter(
        (ingredientItem) => ingredientItem.name !== ingredient.name
      )
    );
    setNewIngredientTypeList([]);
  };

  const getMeasurements = async (baseMeasurement) => {
    try {
      const response = await axios.get(
        `/api/ingredients/measurements/${baseMeasurement}`
      );
      setBaseMeasurementForNewIngredient(baseMeasurement);
      setNewMeasurement(response.data);

      return response.data;
    } catch (error) {
      console.error();
    }
  };

  useEffect(() => {
    const getInitData = async () => {
      setLevels(await getLevels());
      setCategoryList(await getCategorys());
      setIngredientsList(await getIngredient());
      setIngredientTypeList(await getNewIngredientBaseMeasurements());
    };
    getInitData();
  }, []);

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
      if (isFilePicked) {
        addRecipe(values, selectedFile, newIngredientsList)
          ? setStatus('Sikeres hozzáadás!')
          : setStatus('Sikertelen hozzáadás');
      } else {
        setFormValuesForModal(values);
      }
    },
  });

  async function getIngredienTypeFunction(newIngredientString) {
    const newIngredientObject = JSON.parse(newIngredientString);
    try {
      const response = await axios.get(
        `/api/ingredients/${newIngredientObject.id}`
      );

      setIngredient(newIngredientObject);

      setNewIngredientType(response.data.measurements[0]);

      setNewIngredientTypeList(response.data.measurements);
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
  };

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
            {levels[1]
              ? levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))
              : 'loading'}
          </select>
          <p className="mt-2">Kategória választás:</p>

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
            <div className="col">
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
                onChange={(e) => {
                  getIngredienTypeFunction(e.target.value);
                  setNewIngredientType(newIngredientType);
                }}
              >
                <option>Hozzávaló neve</option>
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
                onChange={(e) => {
                  setNewIngredientType(JSON.parse(e.target.value));
                }}
              >
                {newIngredientTypeList.map((l) => (
                  <option key={l} value={JSON.stringify(l)}>
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
                onClick={addIngredientToRecipe}
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <p className="col-2 mt-2 pl-0 d-flex align-items-center">
            {' '}
            Új hozzávaló megadása
          </p>
          <div className="col-3">
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

          <div className="col-2">
            <input
              className="form-control"
              id="addNewAmount"
              type="text"
              value={addNewAmount}
              onChange={(e) => setAddNewAmount(e.target.value)}
              placeholder="Adja meg a mennyiséget"
            />
          </div>
          <div className="col-1">
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
        </div>

        <div>
          <p>Kép hozzáadása</p>
          <div className="ImageUploader">
            <input type="file" onChange={fileSelectedHandler} />
          </div>
        </div>

        <p>Kiválasztott hozzávalók:</p>

        <IngredientsInRecipeList ingredientsList={newIngredientsList} />
        <button
          className="btn btn-success mt-4"
          type="submit"
          data-toggle="modal"
          data-target={
            isFilePicked ? '#recipeStatusModal' : '#noFilePickedModal'
          }
        >
          Hozzáadás
        </button>
        <Modal status={status} id="recipeStatusModal" />
        <NoImageSelectedModal
          status={'Lehetőség van fénykép hozzáadására!'}
          id="noFilePickedModal"
          formValuesForModal={formValuesForModal}
          selectedFile={selectedFile}
          newIngredientsList={newIngredientsList}
        />
        <Modal status={status} id="ingredientStatusModal" />
      </div>
    </form>
  );
};

export default AddRecipeForm;
