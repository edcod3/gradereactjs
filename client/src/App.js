import React, { useState, useEffect } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import axios from "axios"
import { useAlert } from "react-alert"
import Navbar from "./Navbar"
import Login from "./components/login"
import Home from "./components/home"
import Subject from "./components/subject"
import Calculator from "./components/notenrechner"
//import CalendarApp from './components/calmenu'
import { subjtables, SessionLogout } from "./utils/scripts"
import { GetApiUrl } from "./utils/apiurl"
import CalendarMenu from "./components/calmenu"

function App() {
	//Enable express-session persistence
	axios.defaults.withCredentials = true

	//Use react-alert (for logout)
	const alert = useAlert()

	//State for logged in User
	const [loggedIn, setloggedIn] = useState(false)

	//State for redirection from /home (onClick)
	const initialRedirect = "/login"
	const [subjRedirect, setSubjRedirect] = useState(initialRedirect)

	useEffect(() => {
		if (!sessionStorage.getItem("user")) {
			//console.log("User doesn't exists")
			setloggedIn(false)
		} else {
			//console.log("User exist")
			setloggedIn(true)
		}
	}, [loggedIn, subjRedirect])

	//SessionStorage for saving user during browser Session
	//(this is most likely horrible for security, but I hope it is acceptable and the React Gods don't look down on me with shame & disappointment)
	const login = (loginUname) => {
		sessionStorage.setItem("user", loginUname)
		setloggedIn(true)
	}

	//Logout on NodeJS API & remove user from SessionStorage
	const logout = () => {
		axios
			.get(`http://${GetApiUrl()}/logout`)
			.then((res) => {
				if (res.status === 200) {
					sessionStorage.setItem("user", "")
					setloggedIn(false)
					alert.success("Erfolgreich abgemeldet!")
				} else {
					alert.error(
						"Abmeldung fehlgeschlagen. Versuche es nochmals!"
					)
				}
			})
			.catch((err) => SessionLogout(err))
	}

	return (
		<>
			{loggedIn ? (
				<Navbar
					uname={sessionStorage.getItem("user")}
					logout={logout}
				/>
			) : (
				<div></div>
			)}
			<Switch>
				<Route path="/login" exact>
					{loggedIn ? (
						<Redirect to="/home" />
					) : (
						<Login login={login} />
					)}
				</Route>
				<Route path="/home" exact>
					{loggedIn ? (
						() => {
							if (subjRedirect !== initialRedirect) {
								let newRedirect = subjRedirect
								setSubjRedirect(initialRedirect)
								return <Redirect to={newRedirect} />
							} else {
								return <Home redirect={setSubjRedirect} />
							}
						}
					) : (
						<Redirect to="/login" />
					)}
				</Route>
				{subjtables.map((subject) => {
					return (
						<Route path={`/${subject}`} key={`${subject}-route`}>
							{loggedIn ? (
								<Subject subj={subject} />
							) : (
								<Redirect to="/login" />
							)}
						</Route>
					)
				})}
				<Route path="/calculator" exact>
					{loggedIn ? <Calculator /> : <Redirect to="/login" />}
				</Route>
				<Route path="/calendar">
					{loggedIn ? <CalendarMenu /> : <Redirect to="/login" />}
				</Route>
				<Route path="/" exact>
					{loggedIn ? (
						<Redirect to="/home" />
					) : (
						<Redirect to="/login" />
					)}
				</Route>
				<Route path="/*">
					{loggedIn ? (
						<Redirect to="/home" />
					) : (
						<Redirect to="/login" />
					)}
				</Route>
			</Switch>
		</>
	)
}

export default App
