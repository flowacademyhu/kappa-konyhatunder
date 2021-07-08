import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().required('A recept nevét kötelező megadni!'),
  description: yup
    .string()
    .required('Az elkészítés mező kötelező!')
    .min(10, 'Minimum 10 karakter.')
    .max(10000, 'Maximum 10 ezer karakter lehetséges!'),
  preparationTime: yup
    .number('Nem szám formátum')
    .required('Kötelező mező')
    .min(1, 'Negatív érték nem adható meg!')
    .max(1000, 'Maximum 1000 perc adható meg!'),
  categoryList: yup.array().min(1, 'Kategória választás kötelező!'),
});
