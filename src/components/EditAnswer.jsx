import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AnswersContext from "../contexts/AnswersContext";

const StyledEditAnswer = styled.main`
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

const EditAnswer = () => {

  const { id } = useParams();
  const { answers, AnswersAcionTypes, setAnswer } = useContext(AnswersContext);
  const data = answers.find(answer => answer.id.toString() === id);
  const [formInput, setFormInput] = useState({ answer: data.answer });
  const navigate = useNavigate();

  const inputHandler = e => {
    setFormInput({
      ...formInput, [e.target.name]: e.target.value
    })
  }
  const formHandler = (e) => {
    e.preventDefault();
    const newAnswer = {
      ...data, answer: formInput.answer
    }
    setAnswer({
      type: AnswersAcionTypes.edit,
      answerId: id,
      data: newAnswer
    });
    navigate(-1);
  }
  return (
    <StyledEditAnswer>
      <form onSubmit={e => formHandler(e)}>
        <textarea type="text" name="answer" id="answer" value={formInput.answer} onChange={e => inputHandler(e)} />
        <input type="submit" value="Save" />
      </form>
    </StyledEditAnswer>);
}

export default EditAnswer;