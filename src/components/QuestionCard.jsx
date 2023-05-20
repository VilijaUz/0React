import styled from 'styled-components';
import { useState } from 'react';

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
  padding: 40px;
  p {
    padding-right:10px;
    padding-left:10px;
  }
  h4{
    padding-bottom: 5px;
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
    margin: 10px;
  }
  @media (min-width: 768px) {
    /* Iškeliame flex-basis į viršų, kad apimtų visą kortelės dydį */
    flex-basis: 20%;
    flex-grow: 1;
  }
`;



const QuestionCard = ({ data }) => {

  const [likeCount, setLikeCount] = useState(0);
  const [unlikeCount, setUnlikeCount] = useState(0);
  const [message, setMessage] = useState('');
  const [updated, setUpdated] = useState(message);

  const [answers, setAnswers] = useState([]);
  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
  };

  const handleUnlikeClick = () => {
    setUnlikeCount(unlikeCount + 1);
  };
  const handleChange = (event) => {
    const newMessage = ' '; // Nauja žinutė
    setMessage(event.target.value);




  };
  const handleClick = () => {
    setUpdated(message)
    // setAnswers(message);
    answers.push(message);
    setMessage('')

  };


  return (
    <StyledQuestionList>
      <StyledQuestionCard>
        <div>
          {/* <div>
      <h3>{questions.questions}</h3>
      <p>Likes: {questions.likeCount}</p>
      <p>Dislikes: {questions.unlikeCount}</p>
    </div> */}
          <div>
            <h3 style={{ display: 'inline' }}>{data.title}</h3>
            <p style={{ display: 'inline' }}>{data.question}</p>
            <button style={{ display: 'inline' }} >Edit</button>
            <button style={{ display: 'inline' }} >Delete</button>
          </div>
          <div>
            <p style={{ display: 'inline', marginBottom: '20px' }}>Like <span role="img" aria-label="Thumbs up" onClick={handleLikeClick} style={{ fontSize: '1.5em' }}>👍</span> {likeCount}</p>
            <p style={{ display: 'inline' }}>Dislike <span role="img" aria-label="Thumbs down" onClick={handleUnlikeClick} style={{ fontSize: '1.5em' }}>👎</span> {unlikeCount}</p>

            <p>{data.ifRedacted}</p>
          </div>
        </div>


        <div>
          {
            answers.map((answers, index) =>
              <>
                <li key={index}>   
                  <h4 style={{ display: 'inline' }}>Answer:{answers}</h4>
                  <p style={{ display: 'inline', paddingBottom: '0px' }}>Like <span role="img" aria-label="Thumbs up" onClick={handleLikeClick} style={{ fontSize: '1.5em' }}>👍</span> {likeCount}</p>
                  <p style={{ display: 'inline' }}>Dislike <span role="img" aria-label="Thumbs down" onClick={handleUnlikeClick} style={{ fontSize: '1.5em' }}>👎</span> {unlikeCount}</p>
                  <button>Edit</button>
                  <button>Delete</button> </li>

              </>
            )}
        </div>
        <div>
          <span style={{ paddingRight: '20px' }} >  Answers area:  </span>
          <textarea
            value={message} onChange={handleChange} htmlFor="textarea">{data.answer}</textarea >
          <button style={{ paddingLeft: '20px', marginLeft: '30px' }} onClick={handleClick}>Create</button>
          <p style={{ display: 'inline', marginBottom: '20px' }}>Like <span role="img" aria-label="Thumbs up" onClick={handleLikeClick} style={{ fontSize: '1.5em' }}>👍</span> {likeCount}</p>
          <p style={{ display: 'inline' }}>Dislike <span role="img" aria-label="Thumbs down" onClick={handleUnlikeClick} style={{ fontSize: '1.5em' }}>👎</span> {unlikeCount}</p>

        </div>
      </StyledQuestionCard>
    </StyledQuestionList>
  )
}

export default QuestionCard;