import React, {useState, useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar';
import Login from './login';
import Home from './home';
import Subject from './subject';
import Calculator from './notenrechner'

function App() {

  //Enable express-session persistence
  axios.defaults.withCredentials = true;

  const [loggedIn, setloggedIn] = useState(false)
  const tables = ["app_development","economics","english","finances","french","german","history","mathematics","sports","system_technology"];
//  const [redirect, setRedirect] = useState("/login")

  useEffect(() => {
    const testLS = {test: "SessionStorage"}
    const userLS = sessionStorage.getItem('user')
    console.log(userLS)
    let usertype = typeof userLS
    let testtype = typeof testLS
    if (userLS === '' || userLS === undefined || userLS === null || usertype === testtype)  {
      console.log("User doesn't exists")
      setloggedIn(false)
    } else {
      console.log("User exist")
      setloggedIn(true)
    }
  }, [loggedIn])

  const login = (loginUname) => {
    sessionStorage.setItem('user', loginUname)
    setloggedIn(true)
  }

  const logout = () => {
    axios.get("http://localhost:8000/logout")
    .then(res => {
      sessionStorage.setItem('user', '')
      setloggedIn(false)
    })
    .catch(err => console.log(err))
  }

  return (
      <>
      {(loggedIn || sessionStorage.getItem('user') !== "")
        ? <Navbar uname={sessionStorage.getItem('user')} logout={logout}/>
        : <div></div>
      }
      <Switch>
      <Route path="/login" exact>
      {(loggedIn || sessionStorage.getItem('user') !== "") 
        ? <Redirect to="/home" />
        : <Login login={login}/>
      }
      </Route>   
      <Route path="/home">
        { (loggedIn || sessionStorage.getItem('user') !== "")
          ? <Home />
          : <Redirect to="/login" />
        }
      </Route>
      {tables.map(subject => {
        return (
          <Route path={`/${subject}`}>
          {(loggedIn || sessionStorage.getItem('user') !== "")
          ? <Subject subj={subject} />
          : <Redirect to="/login" />
          }
          </Route>)
      })}
      <Route path="/calculator" exact>
        { (loggedIn || sessionStorage.getItem('user') !== "")
          ? <Calculator />
          : <Redirect to="/login" />
        }
      </Route>
      <Route path="/">
        {(loggedIn || sessionStorage.getItem('user') !== "")
        ? <Redirect to="/home" />
        : <Redirect to="/login" />
        }
      </Route>
      </Switch>
      </>
  );
}

/*
      {(loggedIn || sessionStorage.getItem('user') !== "")
        ? <Navbar uname={sessionStorage.getItem('user')}/>
        : <div></div>
      }
*/
export default App;