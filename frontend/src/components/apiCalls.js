import axios from 'axios';
export const saveNewIngredient = async (ingredinet, measurement) => {
  const data = {
    name: ingredinet,
    measurement: measurement,
  };

  try {
    const response = await axios.post(`/api/ingredients`, data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addRecipe = async (values, selectedFile, newIngredientsList) => {
  const data = {
    name: values.name,
    description: values.description,
    preparationTime: values.preparationTime,
    difficulty: values.level,
    categories: values.categoryList,
    ingredients: values.ingredients,
  };
  const recipeFormData = {
    ...data,
    ingredients: newIngredientsList,
  };

  const formData = new FormData();
  const recipe = { ...recipeFormData };
  formData.append('image', selectedFile);
  formData.append('recipeDTO', JSON.stringify(recipe));

  try {
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    axios.post('/api/recipes/', formData, config);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
};

export const addNewCategory = async (category) => {
  try {
    await axios.post(`/api/categories`, { name: category });
  } catch (error) {
    return false;
  }
  return true;
};

export const getNewIngredientBaseMeasurements = async () => {
  try {
    const response = await axios.get(`/api/ingredients/measurements`);

    return response.data;
  } catch (error) {
    console.error();
  }
};

export const getRecipeList = async (id) => {
  try {
    const response = await axios.get(`/api/recipes/${id}`);

    return response.data;
  } catch (err) {
    console.error('Error during api call:', err);
  }
};

export const getLevels = async () => {
  try {
    const response = await axios.get(`/api/recipes/difficutlies`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCategorys = async () => {
  try {
    const response = await axios.get(`/api/categories`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getIngredient = async () => {
  try {
    const response = await axios.get(`/api/ingredients`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRecipesWithMatchingIngredients = async (
  ingredients,
  searchBy
) => {
  try {
    const response = await axios.post(
      `/api/recipes/search/${searchBy}`,
      ingredients
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const recommend = async (id, operator) => {
  try {
    const response = await axios.post(
      `/api/recipes/${id}/?recommend=${operator}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postComment = async (id, text) => {
  const data = {
    text: text,
  };
  try {
    const response = await axios.post(`/api/recipes/${id}/comments`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMostRecommendedRecipes = async () => {
  try {
    const response = await axios.get(`/api/recipes/mostrecommended`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
