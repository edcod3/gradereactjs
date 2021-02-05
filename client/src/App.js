import React, {useState, useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import { useAlert } from 'react-alert'
import Navbar from './Navbar';
import Login from './login';
import Home from './home';
import Subject from './subject';
import Calculator from './notenrechner'
import { subjtables } from './utils/scripts'

function App() {

  //Enable express-session persistence
  axios.defaults.withCredentials = true;

  const alert = useAlert()

  const [loggedIn, setloggedIn] = useState(false)
  const initialRedirect = "/login"
  const [subjRedirect, setSubjRedirect] = useState(initialRedirect)
  const tables = subjtables
  //const tables = ["app_development","economics","english","finances","french","german","history","mathematics","sports","system_technology"];
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
  }, [loggedIn, subjRedirect])

  const login = (loginUname) => {
    sessionStorage.setItem('user', loginUname)
    setloggedIn(true)
  }

  const logout = () => {
    axios.get("http://localhost:8000/logout")
    .then(res => {
      if (res.status === 200) {
        sessionStorage.setItem('user', '')
        setloggedIn(false)
        alert.success("Erfolgreicht abgemeldet")
      } else {
        alert.error("Abmledung fehlgeschlagen.  Versuche es nochmals!")
      }
    })
    .catch(err => console.log(err))
  }

  const SubjectRedirect = (subject) => {
    return setSubjRedirect(subject)
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
          ? () => {
              if (subjRedirect !== initialRedirect) {
                let newRedirect = subjRedirect
                setSubjRedirect(initialRedirect)
                return(<Redirect to={newRedirect} />)
              } else {
                return(<Home redirect={SubjectRedirect}/>)
              }
            }
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