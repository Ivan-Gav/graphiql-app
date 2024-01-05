import * as yup from 'yup';

const REGEX = {
  username: /^[A-Z]/,
  password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d])/,
};

export const VALIDATION_MESSAGE = {
  firstName: 'YUP_FIRST_LETTER',
  lastName: 'YUP_FIRST_LETTER',
  email: {
    required: 'YUP_EMAIL_REQUIRED',
    valid: 'YUP_EMAIL_INVALID',
  },
  password: {
    length: 'YUP_PASS_LENGTH',
    strength: 'YUP_PASS_STRENGTH',
  },
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
  })
  .required();

export type SchemaSignUp = yup.InferType<typeof schema>;

export default schema;
