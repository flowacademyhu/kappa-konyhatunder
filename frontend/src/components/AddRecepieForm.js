import InputGroup from './InputGroup';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .required('A felhasználónév kötelező!')
    .min(10, 'Minimum 10 karakter.'),
  password: yup.string().required('A jelszó kötelező'),
});

function AddRecepieForm() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-6 col-lg-4 center">
          <Formik
            validationSchema={validationSchema}
            initialValues={{ userName: '', password: '' }}
            onSubmit={(e) => console.log(e)}
          >
            <Form>
              <InputGroup
                name="recepieName"
                type="text"
                label="A recept megnevezése"
              />
              <InputGroup
                name="makingTime"
                type="text"
                label="Elkészítési idő"
              />
              <button className="btn btn-primary w-100" type="submit">
                Beküldés
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AddRecepieForm;
