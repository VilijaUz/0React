import { createContext, useReducer, useEffect } from "react";

const QuestionsContext = createContext();

const QuestionsAcionTypes = {
  get: 'get_all_question',
  add: 'add_new_question',
  delete: 'delete_question',
  edit: 'edit_question'
}
const reducer = (state, action) => {
  switch (action.type) {
    case QuestionsAcionTypes.get:
      return action.data;
    case QuestionsAcionTypes.add:
      fetch('http://localhost:8080/questions', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.data)
      });
      return [...state, action.data];
      case QuestionsAcionTypes.delete:
        fetch(`http://localhost:8080/questions/${action.questionsId}`, {
          method: "DELETE"
        });
        return state.filter(questions => questions.id !== action.questionsId);
  
      case QuestionsAcionTypes.edit: 
        fetch(`http://localhost:8080/questions/${action.questionsId}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(action.data)
        });
        return state.map(questions => {
          if (questions.id === action.questionsId) {
            return action.data;
          }
          return questions;
        });

    default:
      return state;
  }
}
const QuestionsProvider = ({ children }) => {

  const [question, setQuestion] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8080/questions`)
      .then(res => res.json())
      .then(data => setQuestion({
        type: QuestionsAcionTypes.get,
        data: data

      }));
  }, []);

  return (
    <QuestionsContext.Provider
      value={{
        question,
        QuestionsAcionTypes,
        setQuestion
      }}>
      {children}
    </QuestionsContext.Provider>
  );
}
export { QuestionsProvider };
export default QuestionsContext;