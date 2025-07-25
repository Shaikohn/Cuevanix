import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./redux/store/index"
import axios from "axios"

const root = ReactDOM.createRoot(document.getElementById("root"));

/* axios.defaults.baseURL = "https://cuevanix-backend.onrender.com" */
axios.defaults.baseURL = "http://localhost:3001"


root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
