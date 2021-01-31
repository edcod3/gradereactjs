import React, {useState, useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './Navbar';
import Login from './login';
import Home from './home';
import Subject from './subject';

function App() {
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
    sessionStorage.setItem('user', '')
    setloggedIn(false)
  }

  return (
      <>
      {(loggedIn)
        ? <Navbar uname={sessionStorage.getItem('user')} logout={logout}/>
        : <div></div>
      }
      <Switch>
      <Route path="/login" exact>
      {(loggedIn) 
        ? <Redirect to="/home" />
        : <Login login={login}/>
      }
      </Route>   
      <Route path="/home">
        { (loggedIn)
          ? <Home />
          : <Redirect to="/login" />
        }
      </Route>
      {tables.map(subject => {
        return (
          <Route path={`/${subject}`}>
          {(loggedIn)
          ? <Subject subj={subject} />
          : <Redirect to="/login" />
          }
          </Route>)
      })}
      <Route path="/">
        {(loggedIn)
        ? <Redirect to="/home" />
        : <Redirect to="/login" />
        }
      </Route>
      </Switch>
      </>
  );
}

/*
      {(loggedIn)
        ? <Navbar uname={sessionStorage.getItem('user')}/>
        : <div></div>
      }
*/
export default App;
