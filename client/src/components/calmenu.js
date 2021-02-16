import React, { useState, useEffect } from "react"
import CalendarApp from "./calendar"
import { capitalize, setInput } from "../utils/scripts"
import useLocalStorage from "../utils/customHooks"

export default function CalendarMenu() {
	//Authentication States & Input
	const [authInp, setauthInp] = useState({ first_name: "", last_name: "" })
	const [authed, setAuthed] = useState({ auth: false, msg: "" })

	//Persist Authentication for Calendar Access
	const [persAuth, setpersAuth] = useLocalStorage("cal", "")

	//API Keys
	const api_key = process.env.REACT_APP_TEAMUP_API_KEY
	const cal_key = process.env.REACT_APP_TEAMUP_CALKEY

	useEffect(() => {
		fetch(`https://api.teamup.com/${cal_key}/configuration`, {
			credentials: "omit",
			method: "get",
			headers: { "Teamup-Token": api_key }
		})
			.then((response) => response.json())
			.then((data) =>
				persAuth === data.configuration.identity.title
					? setAuthed({ auth: true, msg: "" })
					: setAuthed({ auth: false, msg: "" })
			)
	}, [api_key, cal_key, persAuth])

	//Authenticate User based on API Configuration
	const GetAuth = (event) => {
		event.preventDefault()
		fetch(`https://api.teamup.com/${cal_key}/configuration`, {
			credentials: "omit",
			method: "get",
			headers: { "Teamup-Token": api_key }
		})
			.then((response) => response.json())
			.then((data) => {
				const raw = data.configuration.general_settings.admin_email
				const [firstname, lastname] = raw.split("@")[0].split(".")
				if (
					(authInp.first_name === capitalize(firstname) ||
						authInp.first_name === firstname) &&
					(authInp.last_name === capitalize(lastname) ||
						authInp.last_name === lastname)
				) {
					//console.log("auth_success")
					setAuthed({ auth: true, msg: "" })
					setpersAuth(data.configuration.identity.title)
				} else {
					//console.log("auth_failed")
					let auth_msg =
						"Dieser Name ist falsch. Versuche es nochmals!"
					setAuthed({ auth: false, msg: auth_msg })
				}
			})
			.catch((err) => console.log(err))
	}

	return (
		<div
			style={
				window.innerWidth <= 520
					? { paddingTop: "10px" }
					: { paddingTop: "30px" }
			}>
			{authed.auth ? (
				<CalendarApp />
			) : (
				<div className="wrapper" id="cal_wrapper">
					<h2 className="title">Kalender: Authentifizierung</h2>
					<p>
						Gib den Namen der <b>Klassenlehrperson</b> ein, um
						Zugriff zum Kalender zu erhalten.
					</p>
					<br />
					<p style={{ color: "red" }}>{authed.msg}</p>
					<form onSubmit={GetAuth} className="cal_form">
						<label>Vorname: </label>
						<input
							type="text"
							placeholder="Vorname"
							name="first_name"
							value={authInp.first_name}
							onChange={(evnt) => setInput(setauthInp, evnt)}
						/>
						<br />
						<label>Nachname: </label>
						<input
							type="text"
							placeholder="Nachname"
							name="last_name"
							value={authInp.last_name}
							onChange={(evnt) => setInput(setauthInp, evnt)}
						/>
						<button type="submit" className="cal_btn">
							<span>Authentifizieren</span>
						</button>
					</form>
				</div>
			)}
		</div>
	)
}
