import axios from 'axios';

export const saveNewIngredient = async (ingredinet, measurement) => {
  const data = {
    name: ingredinet,
    measurement: measurement,
  };

  try {
    const response = await axios.post(`/api/ingredients`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
