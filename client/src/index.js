import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router, useLocation} from 'react-router-dom';
//React Alert Pop-Up
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from './utils/alert-template'
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

const alert_opts = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    timeout: 100000,
    offset: '80px',
    //type: types.SUCCESS,
    // you can also just use 'scale'
    transition: transitions.FADE,
    containerStyle: {
      zIndex: 100
    }
}

function Main () {
  PageLocation();
  return <App />
  
}

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...alert_opts}>
      <Router>
        <Main />
      </Router>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
