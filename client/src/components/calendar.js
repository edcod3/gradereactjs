import React, { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom'
//import axios from 'axios'
import EventForm from "./calendar/EventForm"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "moment/locale/de-ch"
//Calender CSS-Styling
import "react-big-calendar/lib/css/react-big-calendar.css"

export default function CalendarApp() {
	//Calendar URL
	const calUrl = useLocation()

	//Event State
	const [apiResponse, setapiResponse] = useState([
		{
			id: 0,
			start: moment().toDate(),
			end: moment().add(7, "days").toDate(),
			title: "Termine werden geladen..."
		}
	])

	//Api Keys
	const api_key = process.env.REACT_APP_TEAMUP_API_KEY
	const cal_key = process.env.REACT_APP_TEAMUP_CALKEY

	//React-Big-Calendar Stuff

	//Moment-Localizer
	const localizer = momentLocalizer(moment)

	function handleEvents(rawEvents) {
		let event_id = 0
		const formatedEvnts = rawEvents.map((evnt) => {
			const formatedEvnt = {
				id: event_id,
				start: moment(evnt.start_dt).toDate(),
				end: moment(evnt.end_dt).toDate(),
				title: evnt.title,
				className: "testclass"
			}
			event_id = formatedEvnt.id + 1
			return formatedEvnt
		})
		if (rawEvents.length === formatedEvnts.length) {
			setapiResponse(formatedEvnts)
		}
	}

	//Scroll to bottom (calendar export)
	const scrollToBottom = (url) => {
		const urlParam = url.search
		const urlSearchParams = new URLSearchParams(urlParam)
		if (urlSearchParams.has("export")) {
			window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
		}
	}

	useEffect(() => {
		scrollToBottom(calUrl)
		fetch(
			`https://api.teamup.com/${cal_key}/events?startDate=2021-08-15&endDate=2022-08-12`,
			{
				credentials: "omit",
				method: "get",
				headers: { "Teamup-Token": api_key }
			}
		)
			.then((response) => response.json())
			.then((data) => {
				//console.log(data.events)
				handleEvents(data.events)
				//setapiResponse(data.events)
			})
			.catch((err) => console.log(err))
	}, [cal_key, api_key, calUrl])

	/*function CheckAccess () {
        fetch(`https://api.teamup.com/check-access`, api_config)
        .then(response => response.json())
        .then(data => {
            
        })
        .catch(err => console.log(err))
    }*/

	//React-Big-Calendar localized messages
	const messages = {
		allDay: "ganzer Tag",
		previous: "Vorherig",
		next: "Nächster",
		today: "Heute",
		month: "Monat",
		week: "Woche",
		day: "Tag",
		agenda: "Agenda",
		date: "Datum",
		time: "Zeit",
		event: "Termin"
	}

	return (
		<>
		<Calendar
			popup
			localizer={localizer}
			defaultDate={new Date()}
			defaultView="month"
			startAccessor="start"
			endAccessor="end"
			messages={messages}
			events={apiResponse}
			style={
				window.innerWidth
					? { height: "600px", margin: "2px 10px 2px 10px" }
					: { height: "600px", margin: "10px 30px 10px 30px" }
			}
		/>
		<EventForm />
		</>
	)
}
