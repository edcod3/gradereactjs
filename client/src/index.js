import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, useLocation} from 'react-router-dom';
import './assets/styles.css'

function PageLocation () {
  let location = useLocation();
  React.useEffect(() => {
        //Conditional Body Styling (CSS)
        if (location.pathname === "/login") {
          document.body.className = 'login-body';
        } else {
          document.body.className = 'main-body';
        }
  }, [location])
}

function Main () {
  PageLocation();
  return <App />
  
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Main />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
