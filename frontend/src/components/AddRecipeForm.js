import { useFormik } from 'formik';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { validationSchema } from './ValidationSchema';
import Modal from './Modal';
import IngredientsInRecipeList from './IngredientsInRecipeList';
import '../styles/AddRecipeForm.css';
import {
  saveNewIngredient,
  addRecipe,
  addNewCategory,
  getLevels,
  getCategorys,
  getNewIngredientBaseMeasurements,
} from './apiCalls';

import NoImageSelectedModal from './NoImageSelectedModal';
import styled from 'styled-components';
import IngredientsAdder from './IngredientsAdder';

const Image = styled.img`
  object-fit: cover;
  width: 100px;
  height: 100px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const AddRecipeForm = () => {
  const [formValuesForModal, setFormValuesForModal] = useState('');
  const [status, setStatus] = useState('Sikertelen hozzáadás');
  const [statusForIngredient, setStatusForIngredient] = useState(
    'Sikertelen hozzáadás'
  );
  const [levels, setLevels] = useState([]);
  const [category, setCategory] = useState('');
  const [newIngredientsList, setNewIngredientsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [addNewIngredient, setAddNewIngredient] = useState('');
  const [ingredientTypeList, setIngredientTypeList] = useState([]);
  const [addNewAmount, setAddNewAmount] = useState('');
  const [ingredientTypeFromUser, setIngredientTypeFromUser] = useState('-');
  const [baseMeasurementForNewIngredient, setBaseMeasurementForNewIngredient] =
    useState('');
  const [newMeasurement, setNewMeasurement] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [preview, setPreview] = useState();

  const inputFile = useRef(null);

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const addIngredientToRecipe = (ingredient) => {
    setNewIngredientsList([
      ...newIngredientsList.filter(
        (ingredientItem) => ingredientItem.name !== ingredient.ingredient.name
      ),
      ingredient,
    ]);
  };

  async function addCategory(value) {
    if (value === '') {
      setStatus('Kategória megadása kötelező!');
      return;
    }
    setCategoryList([...categoryList, { name: value }]);
    addNewCategory(value)
      ? setStatus('Sikeres kategória hozzáadás!')
      : setStatus('Sikertelen hozzáadás');
    setCategory('');
  }

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
      setIngredientTypeList(await getNewIngredientBaseMeasurements());
    };
    getInitData();
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);

      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      preparationTime: 1,
      level: 'Könnyű',
      ingredients: [],
      categoryList: [],
    },
    validationSchema,

    onSubmit: async (values) => {
      newIngredientsList.length > 0
        ? (await addRecipe(values, selectedFile, newIngredientsList))
          ? setStatus('Sikeres hozzáadás!')
          : setStatus('Sikertelen hozzáadás')
        : setStatus('Sikertelen hozzáadás');
      setFormValuesForModal(values);
    },
  });

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
    setStatusForIngredient('Sikeres hozzávaló hozzáadás');
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
          min="0"
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

          <p className="mt-2">
            <span className="text-danger">★</span>Kategória választás:
          </p>

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
                data-target="#categoryAddModal"
                type="button"
              >
                +
              </button>
            </div>
          </div>

          <IngredientsAdder
            excludedIngredients={newIngredientsList.filter(
              (e) => e.ingredient !== undefined
            )}
            onIngredientAdded={addIngredientToRecipe}
          />
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
              type="number"
              min="0.1"
              value={addNewAmount}
              onChange={(e) => setAddNewAmount(e.target.value)}
              placeholder="Mennyiség"
            />
          </div>
          <div className="col-1">
            <button
              className="btn btn-success"
              onClick={() => {
                addNewIngredient &&
                  ingredientTypeFromUser &&
                  baseMeasurementForNewIngredient &&
                  addNewAmount &&
                  sendNewIngredient(
                    addNewIngredient,
                    ingredientTypeFromUser,
                    addNewAmount
                  );
              }}
              type="button"
              data-toggle="modal"
              data-target="#ingredientAddModal"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <p>Kép hozzáadása</p>
          <div>
            {selectedFile && <Image src={preview} />}
            <input
              style={{ display: 'none' }}
              type="file"
              accept="image/*"
              onChange={fileSelectedHandler}
              ref={inputFile}
            />
          </div>
          <button
            className="btn btn-success mt-4"
            onClick={() => inputFile.current.click()}
            type="button"
          >
            Kép feltöltése
          </button>
        </div>

        <p>Kiválasztott hozzávalók:</p>

        <IngredientsInRecipeList ingredientsList={newIngredientsList} />
        <button
          className="btn btn-success mt-4"
          type={isFilePicked ? 'submit' : 'button'}
          data-toggle="modal"
          data-target={
            isFilePicked ? '#recipeStatusModal' : '#noFilePickedModal'
          }
        >
          Hozzáadás
        </button>
        <Modal status={status} id="recipeStatusModal" />
        <Modal status={statusForIngredient} id="ingredientAddModal" />
        <NoImageSelectedModal
          status={'Lehetőség van fénykép hozzáadására!'}
          sentstatus={
            status !== 'Sikertelen hozzáadás'
              ? 'Sikeres hozzáadás!'
              : 'Sikertelen hozzáadás'
          }
          id="noFilePickedModal"
          formValuesForModal={formValuesForModal}
          selectedFile={selectedFile}
          newIngredientsList={newIngredientsList}
        />
        <Modal status={status} id="recipeSuccessStatusModal" />
      </div>
    </form>
  );
};

export default AddRecipeForm;
