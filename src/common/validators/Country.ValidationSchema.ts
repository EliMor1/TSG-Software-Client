import * as yup from 'yup';

export const countryValidationSchema = yup.object().shape({
    capital: yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Capital must contain only letters and spaces')
    .min(2, 'Capital must be atleast 2 characters')
    .required('Capital is required'),
    population: yup.number()
    .positive('Population must be a positive number')
    .required('Population is required')
});
  