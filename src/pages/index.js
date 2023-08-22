import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import IdContext from './utils/IdContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const tgId = "5173339107";
root.render(
  <BrowserRouter>
    <IdContext.Provider value={tgId}>
      <App />
    </IdContext.Provider>
  </BrowserRouter>
);
