import * as yup from 'yup';

const REGEX = {
  username: /^[A-Z]/,
  password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d])/,
};

export const VALIDATION_MESSAGE = {
  firstName: 'First uppercased letter',
  lastName: 'First uppercased letter',
  email: {
    required: 'Email is a required field',
    valid: 'Please enter a valid email',
  },
  password: {
    length: 'Minimum 8 symbols',
    strength:
      'Password strength: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character',
  },
  rules: 'Rules not accepted',
};

const schema = yup
  .object({
    firstName: yup
      .string()
      .matches(REGEX.username, VALIDATION_MESSAGE.firstName)
      .required(),
    lastName: yup
      .string()
      .matches(REGEX.username, VALIDATION_MESSAGE.lastName)
      .required(),
    email: yup
      .string()
      .email(VALIDATION_MESSAGE.email.valid)
      .required(VALIDATION_MESSAGE.email.required),
    password: yup
      .string()
      .matches(REGEX.password, VALIDATION_MESSAGE.password.strength)
      .min(8, VALIDATION_MESSAGE.password.length)
      .required(),
    rules: yup.bool().oneOf([true], VALIDATION_MESSAGE.rules),
  })
  .required();

export type SchemaSignUp = yup.InferType<typeof schema>;

export default schema;
