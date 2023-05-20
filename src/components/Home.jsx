import { useContext } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import QuestionsContext from "../contexts/QuestionsContext";
import UsersContext from "../contexts/UsersContext";
import QuestionCard from "./QuestionCard";


const StyledHome = styled.main`
  padding: 0 50px;
  background-color: #dbd5d5;
  color: #5c5c5c ;
  margin: 0;
  min-height: calc(100vh - 120px);
  > h1{
    padding-top:100px;
    padding-bottom:100px;
    text-align: center;
    color: #5c5c5c ;
    margin-top: 0;
  }
  >div{
    display: flex;
    flex-direction: column;
    flex-wrap:wrap;
    gap: 5px;
    width: 100%; /* Pakeista į 100% plotį */
    flex-grow: 1; /* Padidinta erdvė pagal turinio dydį */
    padding:10px;
    margin: 0 auto;
  }
`;
const Home = () => {
  const { question } = useContext(QuestionsContext);
  console.log(question);
  const { currentUser } = useContext(UsersContext);
  return (
    <StyledHome>
      {
        currentUser &&
        <NavLink to="/">
          {/* <button>Add New Questions</button> */}
        </NavLink>
      }
      <h1> DON'T BE AFRAID TO ASK QUESTIONS OF THOSE WITH MORE EXPERIENCE</h1>
      <div>
        {
          question.map(question =>
            <QuestionCard
              key={question.id}
              data={question}
            />
          )
        }
      </div>
    </StyledHome>);
}

export default Home;