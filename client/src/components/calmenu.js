import React, { useState, useEffect } from "react"
import axios from "axios"
import CalendarApp from "./calendar"
import { setInput, SessionLogout } from "../utils/scripts"
import { GetApiUrl } from "../utils/apiurl"
import useLocalStorage from "../utils/customHooks"

export default function CalendarMenu() {
	//Enable express-session persistence
	axios.defaults.withCredentials = true

	//Authentication States & Input
	const [authInp, setauthInp] = useState({ first_name: "", last_name: "" })
	const [authed, setAuthed] = useState({ auth: false, msg: "" })

	//Persist Authentication for Calendar Access
	const [persAuth, setpersAuth] = useLocalStorage("cal", "")

	useEffect(() => {
		axios
			.get(`http://${GetApiUrl()}/cal_auth`, {
				headers: {
					"Content-Type": "application/json",
					"Check-Token": persAuth
				}
			})
			.then((res) =>
				res.data.auth_check
					? setAuthed({ auth: true, msg: "" })
					: setAuthed({ auth: false, msg: "" })
			)
			.catch((err) => SessionLogout(err))
	}, [persAuth])

	//Authenticate User based on API Configuration
	const GetAuth = (event) => {
		event.preventDefault()
		const auth_body = {
			cal_login: `${authInp.first_name.toLowerCase()}.${authInp.last_name.toLowerCase()}`
		}
		axios
			.post(`http://${GetApiUrl()}/cal_auth`, auth_body, {
				headers: { "Content-Type": "application/json" }
			})
			.then((res) => {
				if (res.data.auth_succ) {
					console.log("auth_success: " + res.data.auth_succ)
					setAuthed({ auth: true, msg: "" })
					setpersAuth(res.data.auth_check_hash)
				} else {
					//console.log("auth_failed")
					let auth_msg =
						"Dieser Name ist falsch. Versuche es nochmals!"
					setAuthed({ auth: false, msg: auth_msg })
				}
			})
			.catch((err) => SessionLogout(err))
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
