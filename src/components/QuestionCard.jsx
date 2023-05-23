import styled from 'styled-components';
import { useState, useContext} from 'react';
import AnswersContext from '../contexts/AnswersContext';
import { v4 as generateId } from 'uuid';
import UsersContext from '../contexts/UsersContext';
import { useNavigate } from 'react-router-dom';
import QuestionsContext from '../contexts/QuestionsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const StyledQuestionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: auto;
  width: 100%;
  max-width: 1200px; 
  margin: 0 auto; 
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
  padding: 40px;
  p {
    padding-right:10px;
    padding-left:10px;
  }
  h4{
    padding-bottom: 5px;
  }
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
    margin: 10px;
  }
  @media (min-width: 768px) {
    flex-basis: 20%;
    flex-grow: 1;
  }
`;

const QuestionCard = ({ data }) => {

  const [likeCount, setLikeCount] = useState(0);
  const [unlikeCount, setUnlikeCount] = useState(0);
  const [message, setMessage] = useState('');
  const { answers, AnswersAcionTypes, setAnswer } = useContext(AnswersContext);
  const { setQuestion, QuestionsAcionTypes } = useContext(QuestionsContext);
  const { currentUser } = useContext(UsersContext);
  const navigate = useNavigate();


  const handleLikeClick = () => {
      setLikeCount(likeCount + 1);
  };

  const handleUnlikeClick = () => {
    setUnlikeCount(unlikeCount + 1);
  };
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const handleClick = () => {
    if (currentUser) {
      const newAnswer = {
        id: generateId(),
        questionId: data.id,
        userId: currentUser.id,
        answer: message,
        likeList: 0,
        ifRedacted: false
      }
      setAnswer({
        type: AnswersAcionTypes.add,
        data: newAnswer
      })
      setMessage('');
    } else {
      setMessage('Please log in');
    }
  };
  const handleEditClick = (EditActionType, id) => {
    if (EditActionType === 'EditAnswer') {
      if(answers.find(answer => answer.id === id).userId === currentUser?.id){
        navigate(`/EditAnswer/${id}`);
      }
    } else if(EditActionType ==='EditQuestion'){
    navigate(`/EditQuestion/${data.id}`)
    }
  };

  return (
    <StyledQuestionList>
      <StyledQuestionCard>
        <div>
          <div>
            <h3 style={{ display: 'inline' }}>{data.title}</h3>
            <p style={{ display: 'inline',  fontSize: '20px', color: 'red' }}>{data.question}</p>
            <button style={{ display: 'inline' }} onClick={() => handleEditClick('EditQuestion')}> <FontAwesomeIcon icon={faEdit} />Edit</button>
            <button style={{ display: 'inline' }} onClick={()=>{
              if(data.userId === currentUser?.id){setQuestion({questionsId:data.id, type:QuestionsAcionTypes.delete})}
              }}><FontAwesomeIcon icon={faTrash}/></button>
          </div>
          <div>
            <p style={{ display: 'inline', marginBottom: '20px' }} >Like {' '}<span role="img" aria-label="Thumbs up" onClick={handleLikeClick} style={{ fontSize: '1.5em' }}>👍</span> {likeCount}</p>
            <p style={{ display: 'inline' }}>Dislike {' '} <span role="img" aria-label="Thumbs down" onClick={handleUnlikeClick} style={{ fontSize: '1.5em' }}>👎</span> {unlikeCount}</p>
            <p>{data.ifRedacted}</p>
          </div>
        </div>
        <div>
          {
            answers.filter(answer => answer.questionId === data.id).map((answer) =>
                <li key={answer.id}>
                  <h4 style={{ display: 'inline' }}>Answer:{answer.answer}</h4>
                  <p style={{ display: 'inline', paddingBottom: '0px' }}>Like  {' '} <span role="img" aria-label="Thumbs up" onClick={handleLikeClick} style={{ fontSize: '1.5em' }}>👍</span> {likeCount}</p>
                  <p style={{ display: 'inline' }}>Dislike  {' '}<span role="img" aria-label="Thumbs down" onClick={handleUnlikeClick} style={{ fontSize: '1.5em'}}>👎</span> {unlikeCount}</p>
                  <button onClick={() => handleEditClick('EditAnswer', answer.id)}> <FontAwesomeIcon icon={faEdit} />Edit</button>
                  <button onClick={() => {if(answer.userId === currentUser?.id){setAnswer({answerId: answer.id, type: AnswersAcionTypes.delete })}}}><FontAwesomeIcon icon={faTrash}/></button>
                </li>
            )}
        </div>
        <div>
          <span style={{ paddingRight: '20px' , fontSize: '1.5em' }} >  Answers area:  </span>
          <textarea
            value={message} onChange={handleChange} htmlFor="textarea">{data.answers}</textarea >
          <button style={{ paddingLeft: '20px', marginLeft: '30px' }} onClick={handleClick}><FontAwesomeIcon icon={faPlus} />     Create</button>
        </div>
      </StyledQuestionCard>
    </StyledQuestionList>
  )
}

export default QuestionCard;