import * as yup from 'yup';

const userSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default userSchema;
