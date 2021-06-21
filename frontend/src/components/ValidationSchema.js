import * as yup from 'yup';

export const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('A felhasználónév kötelező!')
      .min(10, 'Minimum 10 karakter.'),
    description: yup
      .string()
      .required('A leírás kötelező!')
      .min(10, 'Minimum 10 karakter.'),
    preparationTime: yup
      .number('Nem szám formátum')
      .required('Kötelező mező')
      .max(1000, 'Túl sok')
      .integer('Szám formátum szükséges '),
  });