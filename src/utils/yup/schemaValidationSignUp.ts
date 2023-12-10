import * as yup from 'yup';

const REGEX = {
  username: /^[A-Z]/,
  password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d])/,
};

const schema = yup
  .object({
    firstName: yup
      .string()
      .matches(REGEX.username, 'First uppercased letter')
      .required(),
    lastName: yup
      .string()
      .matches(REGEX.username, 'First uppercased letter')
      .required(),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is a required field'),
    password: yup
      .string()
      .matches(
        REGEX.password,
        'Password strength: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
      )
      .min(8, 'Minimum 8 symbols')
      .required(),
    rules: yup.bool().oneOf([true], 'Rules not accepted'),
  })
  .required();

export type SchemaSignUp = yup.InferType<typeof schema>;

export default schema;
