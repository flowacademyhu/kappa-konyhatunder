import InputGroups from './InputGroups';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { FormControl, InputGroup } from 'react-bootstrap';
import logo from '../images/recept.png';

const validationSchema = yup.object().shape({
  recepieName: yup
    .string()
    .required('A felhasználónév kötelező!')
    .min(10, 'Minimum 10 karakter.'),
  makingTime: yup.number().required('Kötelező mező'),
});

function AddRecepieForm() {
  return (
    <>
      <div class="text-center">
        <img src={logo} className="img-fluid" alt="mainLogo" />
      </div>
      <div className="container">
        <div className="justify-content-center">
          <Formik
            validationSchema={validationSchema}
            initialValues={{ recepieName: '', makingTime: '' }}
            onSubmit={(e) => console.log(e)}
          >
            <Form>
              <InputGroups
                name="recepieName"
                type="text"
                label="A recept megnevezése"
              />
              <InputGroups
                name="makingTime"
                type="number"
                label="Elkészítési idő (percben értetendő )"
              />

              <label htmlFor="basic-url">Recept Leírása</label>
              <InputGroup>
                <InputGroup.Prepend></InputGroup.Prepend>
                <FormControl
                  as="textarea"
                  id="recepieDescription"
                  aria-label="With textarea"
                />
              </InputGroup>
              <br></br>

              <br></br>
              <button className="btn btn-success  w-100" type="submit">
                Beküldés
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}

export default AddRecepieForm;
