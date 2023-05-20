import styled from "styled-components";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useContext } from "react";
import UsersContext from "../contexts/UsersContext";
import { Login } from "@mui/icons-material";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";



const StyledMain = styled.main`
  height: 700px;
  text-align: center;
  padding-top: 200px;
`;
const Register = () => {
  const navigate = useNavigate();
  const { users, setUsers, UsersActionTypes } = useContext(UsersContext);
  const [isUsed, setIsUsed] = useState(false);

  const values = {
    email: '',
    password: '',
    confirmPassword: '',
    avatarURL: '',
    age: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(' This input must be a valid email')
      .required('This input must be filled'),
    avatarURL: Yup.string()
      .url('This field must be a valid URL')
      .trim(),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .trim()
      .required('Input must be filled'),
    confirmPassword: Yup.mixed()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Input must be filled'),
    age: Yup.number()
      .moreThan(50, 'You must be older than 50 years old')
      .required('Input must be filled')
      .typeError('Input must be a number')

  });
  const formik = useFormik({
    initialValues: values,
    validationSchema: validationSchema,
    onSubmit: (values) => {

      const findUser = users.find((value) => value.email === values.email)
      if (findUser) {
        setIsUsed(true);
      } else {
        const newUser = {
          id: uuid(),
          email: values.email,
          password: values.password
        }
        setUsers({ type: UsersActionTypes.add, data: newUser })
        navigate('/');
      }

    }

  });

  return (
    <StyledMain>
      <h2>Registration form</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email" id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.email && formik.errors.email &&
            <p
              style={{ color: 'red' }}
            >{formik.errors.email}</p>
          }
        </div>
        <div>
          <label htmlFor="avatarURL">Avatar URL:</label>
          <input
            type="url"
            name="avatarURL" id="avatarURL"
            value={formik.values.avatarURL}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.avatarURL && formik.errors.avatarURL &&
            <p
              style={{ color: 'red' }}
            >{formik.errors.avatarURL}</p>
          }
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            name="age" id="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.age && formik.errors.age &&
            <p
              style={{ color: 'red' }}
            >{formik.errors.age}</p>
          }
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password" id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.password && formik.errors.password &&
            <p
              style={{ color: 'red' }}
            >{formik.errors.password}</p>
          }
        </div>
        <div>
          <label htmlFor="confirmPassword">Repeat the password:</label>
          <input
            type="password"
            name="confirmPassword" id="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            formik.touched.confirmPassword && formik.errors.confirmPassword &&
            <p
              style={{ color: 'red' }}
            >{formik.errors.confirmPassword}</p>
          }
        </div>
        {
          isUsed && <p style={{ color: 'red' }}>This email exists</p>
        }
        <input type="submit" value="Register" />
      </form>
    </StyledMain>
  );
};

export default Register;

