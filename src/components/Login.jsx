import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UsersContext from "../contexts/UsersContext";

const StyledMain = styled.main`
height: 700px;
text-align: center;
padding-top:200px;
  > form{
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
`;
const Login = () => {
  const [formInputs, setFormInputs] = useState({
    email: '',
    password: ''
  });

  const [failedLogIn, setFailedLogIn] = useState(false);
  const { users, setCurrentUser } = useContext(UsersContext);

  const navigate = useNavigate();

  const inputHandler = e => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value
    });
    setFailedLogIn(false);//pradingsta neteisingi duomenys
  }
  const formSubmit = e => {
    e.preventDefault();
    const loggedInUser = users.find(user => user.email === formInputs.email && user.password === formInputs.password);
    //pasikuriame kintamaji ,tikriname ar vartotojas 
    if (loggedInUser) {
      setCurrentUser(loggedInUser)
      navigate("/")
    } else {
      setFailedLogIn(true)
    }
  }

  return (
    <StyledMain>
      <form onSubmit={(e) => { formSubmit(e) }}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email" id="email"
            value={formInputs.email}
            onChange={(e) => { inputHandler(e) }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password" id="password"
            value={formInputs.password}
            onChange={(e) => { inputHandler(e) }}
          />
        </div>
        <input type="submit" value="Log In" />
      </form>
      {
        failedLogIn &&
        <h1
          style={{ color: 'red', padding: '200px', alignItems: 'center' }}
        >
          Incorrect login details
        </h1>
      }
    </StyledMain>
  );
}

export default Login;