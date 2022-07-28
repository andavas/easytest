import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppRoutes from './routes/routes'

ReactDOM.render(
  <React.StrictMode>
    <AppRoutes/>
  </React.StrictMode>,
  document.getElementById('root')
);
