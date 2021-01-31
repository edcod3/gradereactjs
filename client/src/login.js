import React, {useState} from 'react'
import axios from 'axios';

export default function Login(props) {

    //Enable express-session persistence
    axios.defaults.withCredentials = true;

    const [showForm, setshowForm] = useState({"loginform": "block", "registerform": "none"})
    const showMsgOriginal = {reg_success: false, login_nouser: false, login_failed: false, reg_dupluser: false};
    const [showMsg, setMsg] = useState(showMsgOriginal)
    const [formInput, setformInput] = useState({username_reg: '', password_reg: '', email: '', username: '', password: ''}) 
    
    const [loginForm, registerForm] = ["login-form", "register-form"]

    const RegInputs = [{name: "username_reg", placeholder: "benutzername", type: "text"}, {name: "email", placeholder: "email addresse", type: "text"}, {name: "password_reg", placeholder: "passwort", type: "password"}]
    const LogInputs = [{name: "username", placeholder: "benutzername", type: "text"}, {name: "password", placeholder: "passwort", type: "password"}]

    const setregInput = (name) => {
      return({target: {value} }) => {
        setformInput(oldVal => ({...oldVal, [name]: value}))
      }
    }

    function handleLogin(event) {
      event.preventDefault();
      const loginjson = {
        username: formInput.username,
        password: formInput.password
      }
      console.log(loginjson)
      /*const req_opts = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginjson)
      }*/
      axios.post("http://localhost:8000/login", loginjson, { headers: {'Content-Type': 'application/json'} })
      .then(res => {
        console.log(res.data)
        if (res.data.type === "login_success") {
          console.log("Login successfull");
          props.login(res.data.username);
        } else {
          setMsg(showMsgOriginal);
          setMsg(oldVal => ({...oldVal, [res.data.type]: res.data.bool}));
        }
      })
      .catch(err => {
        console.log(err);
      })

    }

    function handleRegister(event) {
      event.preventDefault();
      const regjson = {
        username_reg: formInput.username_reg,
        email: formInput.email,
        password_reg: formInput.password_reg
      }
      /*const req_opts = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(regjson)
      }*/
      axios.post("http://localhost:8000/login", regjson, { headers: {'Content-Type': 'application/json'} })
      .then(res => {
        console.log(res.data)
        setMsg(showMsgOriginal);
        setMsg(oldVal => ({...oldVal, [res.data.type]: res.data.bool}))
      })
      .catch(err => {
        console.log(err);
      })
    }


    function ChangeForm (formtype) {
        if (formtype === "register-form") {
            const LoginChangeForm = {
                "loginform": "block",
                "registerform": "none"
            } 
            setshowForm(LoginChangeForm)
        } else {
            const RegChangeForm = {
                "loginform": "none",
                "registerform": "block"
            } 
            setshowForm(RegChangeForm)
        }
    }

    return (
        <div className="login-page">
        <div className="form">
            <p className="title">Notenportal I1a</p>
            <p className="registered" id="registered" style={showMsg.reg_success ? {display: "block"} : {display: "none"}}>Erfolgreich registriert!</p>
            <p className="failed" id="nouser" style={showMsg.login_nouser ? {display: "block"} : {display: "none"}}>Dieser Benutzer existiert nicht!</p>
            <p className="failed" id="failed" style={showMsg.login_failed ? {display: "block"} : {display: "none"}}>Login fehlgeschlagen! <br /> Versuche es nochmal</p>
            <p className="failed" id="duplicateuser" style={showMsg.reg_dupluser ? {display: "block"} : {display: "none"}}>Dieser Benutzer existiert bereits! Wähle ein anderen Namen.</p>
          <form className={registerForm} onSubmit={handleRegister} style={{display: showForm["registerform"]}}>
            {RegInputs.map(inpVal => {
              return(<input type={inpVal.type} name={inpVal.name} key={inpVal.name} value={formInput[inpVal.name]} onChange={setregInput(inpVal.name)} placeholder={inpVal.placeholder} required={inpVal.name === "email" ? false : true}/>)
              })
            }
            <button type="submit" className="form-button">erstellen</button>
            <p className="message">Bereits registriert? <button className="formchange-button" onClick={() => ChangeForm(registerForm)}>Log dich ein</button></p>
          </form>
          <form className={loginForm} onSubmit={handleLogin} style={{display: showForm["loginform"]}}>
            {LogInputs.map(logVal => {
              return(<input type={logVal.type} name={logVal.name} key={logVal.name} value={formInput[logVal.name]} onChange={setregInput(logVal.name)} placeholder={logVal.placeholder} required/>)
              })
            }
            <button type="submit" className="form-button">login</button>
            <p className="message">Noch nicht registriert? <button className="formchange-button" onClick={() => ChangeForm(loginForm)}>Erstelle ein Konto</button></p>
          </form>
        </div>
      </div>
    )
}
