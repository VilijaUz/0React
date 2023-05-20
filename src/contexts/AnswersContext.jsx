import { createContext, useReducer, useEffect } from "react";

const AnswersContext = createContext();

const AnswersAcionTypes={
  get:'get_all_answer',
  add: 'add_new_answer'
}

const reducer =(state,action)=>{

  switch (action.type) {
    case AnswersAcionTypes.get:
      return action.data;
    case AnswersAcionTypes.add:
      fetch('http://localhost:8080/answers', {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.data)
      });
      return [...state, action.data];

      default:
      return state;
  }
}

const AnswersProvider = ({children}) => {

  const [answer,setAnswer]=useReducer(reducer,[]);

  useEffect(()=>{
    fetch(`http://localhost:8080/answers`)
    .then(res => res.json())
    .then(data => setAnswer({
      type: AnswersAcionTypes.get,
      data: data

  }));
},[]);

  return (  
    <AnswersContext.Provider
    value={{
    answer,
    AnswersAcionTypes,
    setAnswer
    }}>
    {children}
    </AnswersContext.Provider>
  );
}
 export {AnswersProvider};
export default AnswersContext;