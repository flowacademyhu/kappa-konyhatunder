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
    .max(1000, 'Maximum 1000 perc adható meg!'),
  comment: yup
    .string()
    .required('Üres hozzászólás küldése nem lehetséges!')
    .max(255, 'Maximum 255 karakter lehetséges!'),
});
