import {  useFormik } from 'formik';
import axios from 'axios';


const AddRecepieForm = () => {



  async function addRecipe(values) {
    const data = {
      name: values.name,
      description: values.description,
      preparationTime: values.preparationTime  
    };

    try {
      await axios.post(`http://localhost:8081/api/recipes`,data );
    } catch (error) {
      console.error(error);
    }
  }


  const formik = useFormik({
  initialValues: {
  name: '',
  description: '',
  preparationTime: 0,

  },
  
  onSubmit: (values) => {
addRecipe(values) ;
console.log(values)
  },
  });




  return (
  <form onSubmit={formik.handleSubmit}>
  <label htmlFor="name">name</label>
  <input id="name" type="text" {...formik.getFieldProps('name')} />
  {formik.touched.name && formik.errors.name ? (
  <div>{formik.errors.name}</div>
  ) : null}
  
  <label htmlFor="long">description</label>
  <input
  id="description"
  type="text"
  {...formik.getFieldProps('description')}
  />
  {formik.touched.description && formik.errors.description ? (
  <div>{formik.errors.description}</div>
  ) : null}
  
  <label htmlFor="preparationTime">preparationTime</label>
  <input id="preparationTime" type="number" {...formik.getFieldProps('preparationTime')} />
  {formik.touched.preparationTime && formik.errors.preparationTime ? (
  <div>{formik.errors.preparationTime}</div>
  ) : null}
  
  
  <button type="submit">Submit</button>
  </form>
  );
 };


export default AddRecepieForm;
