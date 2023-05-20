import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UsersContext from "../contexts/UsersContext";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { useFormik } from "formik";

const StyledMain = styled.main`
  height: 700px;
  text-align: center;
  padding-top: 200px;
  /* > form {
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  } */
`;
const Register = () => {

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
      .moreThan(18, 'You must be older than 18 years old')
      .required('Input must be filled')
      .typeError('Input must be a number')

  });
  const formik = useFormik({
    initialValues: values,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });
  // const [formInputs, setFormInputs] = useState({
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const [failedRegistration, setFailedRegistration] = useState(false);
  // const { users, setUsers, setCurrentUser, UsersAcionType } = useContext(UsersContext);

  // const navigate = useNavigate();

  // const inputHandler = (e) => {
  //   setFormInputs({
  //     ...formInputs,
  //     [e.target.name]: e.target.value,
  //   });
  //   setFailedRegistration(false);
  // };
  // const formSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(users);
  //   const emailTaken = users.find(user =>
  //     user.email === formInputs.email)
  //   if (emailTaken) {
  //     setFailedRegistration(true);
  //   } else {
  //     const newUser = {
  //       email: formInputs.email,
  //       password: formInputs.password
  //     };
  //     setUsers({
  //       type: UsersAcionType.add,
  //       data: newUser
  //     })
  //     setCurrentUser(newUser)
  //     navigate("/")
  //   }

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
      <input type="submit" value="Register" />
    </form>


  </StyledMain>
);
};

export default Register;

{/* <StyledMain>
  
{/* <form onSubmit={(e) => formSubmit(e)}> */}
  // <div>
  //   <h2>Registration form</h2>
  //   <label htmlFor="email">Email:</label>
  //   <input
  //     type="email"
  //     name="email"
  //     id="email"
  //     value={formInputs.email}
  //     onChange={(e) => inputHandler(e)}
  //     required
  //   />
  // </div>
  // <div>
  //   <label htmlFor="password">Password:</label>
  //   <input
  //     type="password"
  //     name="password"
  //     id="password"
  //     value={formInputs.password}
  //     onChange={(e) => inputHandler(e)}
  //     required
  //   />
  // </div>
  // <div>
  //   <label htmlFor="confirmPassword">Confirm Password:</label>
  //   <input
  //     type="password"
  //     name="confirmPassword"
  //     id="confirmPassword"
  //     value={formInputs.confirmPassword}
  //     onChange={(e) => inputHandler(e)}
  //     required
  //   />
  // </div>
  // <input type="submit" value="Register" />
// {/* </form> */}
// {failedRegistration && (
//   <h1
//     style={{
//       color: "red",
//       padding: "300px",
//       alignItems: "center",
//     }}
//   >
//     Failed to register. Please check your input.
//   </h1>
// )}
// </StyledMain> */}