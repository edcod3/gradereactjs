import React, { useState } from "react"
import axios from "axios"
import { GetApiUrl } from "../utils/apiurl"
import { setInput, SessionLogout } from "../utils/scripts"

export default function Login(props) {
	//Enable express-session persistence
	axios.defaults.withCredentials = true

	//State to show/hide Login/Registration Form
	const [showForm, setshowForm] = useState({
		loginform: "block",
		registerform: "none"
	})

	//Message to be shown based on API Response
	const showMsgOriginal = {
		reg_success: false,
		login_nouser: false,
		login_failed: false,
		reg_dupluser: false
	}
	const [showMsg, setMsg] = useState(showMsgOriginal)

	//Form classNames
	const [loginForm, registerForm] = ["login-form", "register-form"]

	//Form Input State
	const [formInput, setformInput] = useState({
		username_reg: "",
		password_reg: "",
		email: "",
		username: "",
		password: ""
	})

	const RegInputs = [
		{ name: "username_reg", placeholder: "benutzername", type: "text" },
		{ name: "email", placeholder: "email addresse", type: "text" },
		{ name: "password_reg", placeholder: "passwort", type: "password" }
	]
	const LogInputs = [
		{ name: "username", placeholder: "benutzername", type: "text" },
		{ name: "password", placeholder: "passwort", type: "password" }
	]

	//Handle Login Event
	function handleLogin(event) {
		event.preventDefault()
		const loginjson = {
			username: formInput.username,
			password: formInput.password
		}
		//console.log(loginjson)
		axios
			.post(`http://${GetApiUrl()}/login`, loginjson, {
				headers: { "Content-Type": "application/json" }
			})
			.then((res) => {
				//console.log(res.data)
				if (res.data.type === "login_success") {
					//console.log("Login successfull")
					props.login(res.data.username)
				} else {
					setMsg(showMsgOriginal)
					setMsg((oldVal) => ({
						...oldVal,
						[res.data.type]: res.data.bool
					}))
				}
			})
			.catch((err) => {
				SessionLogout(err)
			})
	}

	//Handle Registration Event
	function handleRegister(event) {
		event.preventDefault()
		const regjson = {
			username_reg: formInput.username_reg,
			email: formInput.email,
			password_reg: formInput.password_reg
		}
		axios
			.post(`http://${GetApiUrl()}/register`, regjson, {
				headers: { "Content-Type": "application/json" }
			})
			.then((res) => {
				//console.log(res.data)
				setMsg(showMsgOriginal)
				setMsg((oldVal) => ({
					...oldVal,
					[res.data.type]: res.data.bool
				}))
			})
			.catch((err) => {
				SessionLogout(err)
			})
	}

	//Switch between Login/Registration Form
	function ChangeForm(formtype) {
		if (formtype === "register-form") {
			const LoginChangeForm = {
				loginform: "block",
				registerform: "none"
			}
			setshowForm(LoginChangeForm)
		} else {
			const RegChangeForm = {
				loginform: "none",
				registerform: "block"
			}
			setshowForm(RegChangeForm)
		}
	}

	return (
		<div className="login-page">
			<div className="form">
				<p className="title">Notenportal I1a</p>
				<p
					className="registered"
					id="registered"
					style={
						showMsg.reg_success
							? { display: "block" }
							: { display: "none" }
					}>
					Erfolgreich registriert!
				</p>
				<p
					className="failed"
					id="nouser"
					style={
						showMsg.login_nouser
							? { display: "block" }
							: { display: "none" }
					}>
					Dieser Benutzer existiert nicht!
				</p>
				<p
					className="failed"
					id="failed"
					style={
						showMsg.login_failed
							? { display: "block" }
							: { display: "none" }
					}>
					Login fehlgeschlagen! <br /> Versuche es nochmal
				</p>
				<p
					className="failed"
					id="duplicateuser"
					style={
						showMsg.reg_dupluser
							? { display: "block" }
							: { display: "none" }
					}>
					Dieser Benutzer existiert bereits! Wähle ein anderen Namen.
				</p>
				<form
					className={registerForm}
					onSubmit={handleRegister}
					style={{ display: showForm["registerform"] }}>
					{RegInputs.map((inpVal) => {
						return (
							<input
								type={inpVal.type}
								name={inpVal.name}
								key={inpVal.name}
								value={formInput[inpVal.name]}
								onChange={(evnt) =>
									setInput(setformInput, evnt)
								}
								placeholder={inpVal.placeholder}
								required={
									inpVal.name === "email" ? false : true
								}
							/>
						)
					})}
					<button type="submit" className="form-button">
						erstellen
					</button>
					<p className="message">
						Bereits registriert?{" "}
						<button
							className="formchange-button"
							onClick={() => ChangeForm(registerForm)}>
							Log dich ein
						</button>
					</p>
				</form>
				<form
					className={loginForm}
					onSubmit={handleLogin}
					style={{ display: showForm["loginform"] }}>
					{LogInputs.map((logVal) => {
						return (
							<input
								type={logVal.type}
								name={logVal.name}
								key={logVal.name}
								value={formInput[logVal.name]}
								onChange={(evnt) =>
									setInput(setformInput, evnt)
								}
								placeholder={logVal.placeholder}
								required
							/>
						)
					})}
					<button type="submit" className="form-button">
						login
					</button>
					<p className="message">
						Noch nicht registriert?{" "}
						<button
							className="formchange-button"
							onClick={() => ChangeForm(loginForm)}>
							Erstelle ein Konto
						</button>
					</p>
				</form>
			</div>
		</div>
	)
}
