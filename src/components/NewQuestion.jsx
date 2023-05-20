import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import UsersContext from '../contexts/UsersContext';
import QuestionsContext from '../contexts/QuestionsContext';
import { v4 as generateId } from 'uuid';


const StyledQuestionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: auto;
  width: 100%; /* Pakeista į 100% plotį */
  max-width: 1200px; /* Pridėtas maksimalus plotis */
  margin: 0 auto; /* Centrinis lygiavimas */
`;

const StyledQuestionCard = styled.div`

  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 5px 5px darkgrey;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  width: 100%;
  height:800px;
  padding: 40px;
  p {
    padding-right:10px;
  }
  /* Šaliname flex-wrap ir height savybes */
  .frame {
    position: relative;
    background-color: #333;
    padding: 20px;
  }
  .frame::before,
  .frame::after {
    content: "";
    position: absolute;
    top: -10px;
    bottom: -10px;
    left: -10px;
    right: -10px;
    border: 5px solid #3f3d3d;
  }
  .frame::before {
    z-index: -1;
  }
  button {
    margin-left: 50px;
  }
  @media (min-width: 768px) {
    /* Iškeliame flex-basis į viršų, kad apimtų visą kortelės dydį */
    flex-basis: 20%;
    flex-grow: 1;
  }
`;

const NewQuestion = () => {

  const navigate = useNavigate();
  const { currentUser } = useContext(UsersContext);
  const { setQuestion, QuestionsAcionTypes } = useContext(QuestionsContext);
  console.log(setQuestion, QuestionsAcionTypes);
  const [formInputs, setFormInputs] = useState({
    title: ''
  });

  const inputHandler = e => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value
    });
    // console.log(e);
  }
  const formHandler = e => {
    e.preventDefault();
    const newQuestion = {
      id: generateId(),
      userId: currentUser.id,
      title: formInputs.title,
      question: formInputs.question,
      likeList:formInputs.likeList
    }
    setQuestion({
      type: QuestionsAcionTypes.add,
      data: newQuestion
    });
    navigate(-1);
  }

  return (
    <StyledQuestionList>
      <StyledQuestionCard>
        <>
          <h1>Add new question</h1>
          <form onSubmit={formHandler}>
            <div>
              <label htmlFor="title">Title :</label>
              <input type="text"
                required
                name='title'
                id='title'
                question='title'
                likeList='title'
                value={formInputs.title}
                onChange={(e) => {
                  inputHandler(e);
                }}/>
              <label htmlFor="question">Question:</label>
              <input type="text"
                required
                name='question'
                id='question'
                value={formInputs.question}
                onChange={(e) => {
                  inputHandler(e);
                }}/>
            </div>
            <input type="submit" value="Create Question" />
          </form>

        </>
      </StyledQuestionCard>
    </StyledQuestionList>
  );
};

export default NewQuestion;

{/* <>
<h1>Add new question</h1>
<form onSubmit={(e) => { formHandler(e) }}>
  <div>
    <label htmlFor="question">Title :</label>
    <input type="text"
      required
      name='question'
      id='question'
      value={formInputs.question}
      onChange={(e) => { inputHandler(e) }}
    />
  </div>
  <input type="submit" value="Create Question" />
</form>
</> */}



// const [questions, setQuestions] = useState('');
// const { addQuestion } = useContext(QuestionsContext);

// const handleChange = (e) => {
//   setQuestions(e.target.value);
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   const newQuestion = {
//     id: generateId(), // Sugeneruojate unikalų ID
//     question: questions,
//     likeCount: 0,
//     dislikeCount: 0
//   };
//   addQuestion(newQuestion); // Pridedate naują klausimą į duomenų kontekstą
//   setQuestions(''); // Išvalote klausimo įvesties lauką
// };





// const [questions, setQuestions] = useState('');
// const [pdated, setPdated] = useState(questions);
// const handleChange = (event) => {
//   const newQuestion = ' ';
//   setQuestions(event.target.value);
// };

// const handleClick=()=>{setPdated(questions)
//   // setAnswers(message);
//   // answers.push(message);
//   console.log(pdated);
//   // setQuestions('')

// };





{/* <form onSubmit={handleSubmit}>
          <textarea type="text" value={question} onChange={handleChange} />
          <button type="submit">Add Question</button>
        </form> */}





{/* <form onSubmit={formHandler}> */ }
{/* <div>
            <span htmlFor="question">Question:</span>
           <span>{pdated}</span>
          </div>
          <textarea  value={questions} onChange={handleChange} htmlFor="textarea"/>
          <button onClick={handleClick}>Create</button> */}
{/* </form> */ }