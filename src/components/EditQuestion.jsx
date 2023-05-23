import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionsContext from '../contexts/QuestionsContext';
import styled from "styled-components";

const StyledEditQuestion = styled.main`
  padding: 250px 500px;
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
    width: 100%;
    flex-grow: 1; 
    padding:10px;
    margin: 0 auto;
  }
`;

const EditQuestion = () => {

  const { id } = useParams();
  const { question, QuestionsAcionTypes, setQuestion } = useContext(QuestionsContext);
  const data = question.find(question => question.id === id);
  const [formInput, setFormInput] = useState({ question: data.question });
  const navigate = useNavigate();

  const inputHandler = e => {
    setFormInput({
      ...formInput, [e.target.name]: e.target.value
    })
  };
  const formHandler = (e) => {
    e.preventDefault();
    const newQuestion = {
      ...data, question: formInput.question
    }
    setQuestion({
      type: QuestionsAcionTypes.edit,
      questionsId: id,
      data: newQuestion
    });
    navigate(-1);
  };

  return (

    <StyledEditQuestion >
      <form onSubmit={e => formHandler(e)}>
        <textarea type="text" name="question" id="question" value={formInput.question} onChange={e => inputHandler(e)} />
        <input type="submit" value="Save" />
      </form>
    </StyledEditQuestion >
  );
}

export default EditQuestion;