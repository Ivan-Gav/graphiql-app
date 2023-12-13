import * as yup from 'yup';

const schema = yup
  .object({
    email: yup
      .string()
      .email('YUP_EMAIL_INVALID')
      .required('YUP_EMAIL_REQUIRED'),
  })
  .required();

export type SchemaSignIn = yup.InferType<typeof schema>;

export default schema;
