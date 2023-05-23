import { createContext, useReducer, useEffect } from "react";

const AnswersContext = createContext();

const AnswersAcionTypes = {
  get: 'get_all_answer',
  add: 'add_new_answer',
  delete: 'delete_answer',
  edit: 'edit_answer'
}
const reducer = (state, action) => {
  switch (action.type) {
    case AnswersAcionTypes.get:
      return action.data;
    case AnswersAcionTypes.add:
      fetch('http://localhost:8080/answers', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.data)
      });
      return [...state, action.data];
      
    case AnswersAcionTypes.delete:
      fetch(`http://localhost:8080/answers/${action.answerId}`, {
        method: "DELETE"
      });
      return state.filter(answer => answer.id !== action.answerId);

    case AnswersAcionTypes.edit: 
      fetch(`http://localhost:8080/answers/${action.answerId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.data)
      });
      return state.map(answer => {
        if (answer.id === action.answerId) {
          return action.data;
        }
        return answer;
      });
    default:
      return state;
  }
};

const AnswersProvider = ({ children }) => {

  const [answers, setAnswer] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8080/answers`)
      .then(res => res.json())
      .then(data => setAnswer({
        type: AnswersAcionTypes.get,
        data: data
      }));
  }, []);

  return (
    <AnswersContext.Provider
      value={{
        answers,
        AnswersAcionTypes,
        setAnswer
      }}>
      {children}
    </AnswersContext.Provider>
  );
}
export { AnswersProvider };
export default AnswersContext;