import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import { useContext } from "react";
import UsersContext from "../contexts/UsersContext";

const StyledHeader = styled.header`
  justify-content: space-between;
  align-items:center ;
  background-color: #222;
  color: #54544f ;
  padding: 30px;

  ul li > a.active{
    color:red;
  }
  img{
    width:50px;
    height: 50px;
    background-color: #5f45a2;
  }
  nav {
    padding-left: 900px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration:none;
  }
  ul {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    margin: 0 10px;  
  }
  ul li a.active{
    color: #7c7c77 !important;
    text-decoration: none;
    font-size: 1.5rem;

  }
  ul li a.active{
color:red  !important;
text-decoration: none;
  }
  form {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  input[type="text"] {
    width: 100%;
    max-width: 50px;
    padding: 8px;
    font-size: 20px;
    border: 1px solid #ccc;
    border-radius: 4px 0 0 4px;
  }
  button[type="submit"] {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #222;
    color: #fff;
    border: none;
    border-radius: 0 4px 4px 0;
  }
`;
const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UsersContext);

  const handleClick = () => {
    alert("Don't be quiet as a mouse");
  };

  return (
    <StyledHeader>
      <div>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/005/337/802/small/icon-symbol-chat-outline-illustration-free-vector.jpg" alt="logo" />
      </div>
      <nav>
        {currentUser ? (
          <>
            <ul>
              <li><NavLink to='/'>Menu</NavLink></li>
              <form>
                <NavLink to='/NewQuestion'>
                  <button onClick={handleClick} style={{ backgroundColor: '#222', color: 'gray', fontSize: '1.3rem' }}>Add new question</button>

                </NavLink>
              </form>

              <li><NavLink to='/'>Questions</NavLink></li>
              <li><NavLink onClick={() => setCurrentUser(null)} to='/'>Logout</NavLink></li>
              <li><NavLink to='/'>Sign In</NavLink></li>
            </ul>
          </>
        ) : (
          <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/Login'>Sign In</NavLink></li>
            <li><NavLink to='/Register'>Register</NavLink></li>
          </ul>
        )}
      </nav>
    </StyledHeader>
  );
}

export default Header;