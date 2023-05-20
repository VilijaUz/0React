import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import Home from './components/Home';
import Header from './components/Header';
import QuestionCard from './components/QuestionCard';
import NewQuestion from './components/NewQuestion';
import UsersContext from './contexts/UsersContext';
import { useContext } from 'react';
import ManageUsersPage from './components/ManageUsersPage';


const App = () => {
   const { currentUser } = useContext(UsersContext);
   return (
      <>
         <Header />
         <Routes>
            <Route
               path="/NewQuestion"
               element={
                  currentUser ?
                     <NewQuestion /> :
                     <Navigate to="/" />
               } />
            <Route
               path="/QuestionCard"
               element={<QuestionCard />} />
            <Route
               path="/"
               element={<Home />} />
            <Route
               path="/Login"
               element={<Login />} />
            <Route
               path="/Register"
               element={<Register />} />
            <Route path="/manageUsers" element={
               currentUser?.name === "Vartotojas1" ?
                  <ManageUsersPage /> :
                  <Navigate to="/Questions" />
            } />
         </Routes>
         <Footer />
      </>
   );
}

export default App;













