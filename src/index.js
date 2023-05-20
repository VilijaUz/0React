import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QuestionsProvider } from './contexts/QuestionsContext';
import { UsersProvider } from './contexts/UsersContext';
import { AnswersProvider } from './contexts/AnswersContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UsersProvider>
    <AnswersProvider>
      <QuestionsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QuestionsProvider>
    </AnswersProvider>
  </UsersProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

