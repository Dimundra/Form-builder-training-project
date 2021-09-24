import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string('')
    .required('required!')
    .email('email or password is wrong!'),
  password: Yup.string()
    .required('required!')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
      'email or password is wrong!'
    ),
  //password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letters
});

export { validationSchema };
