import React, {useState, useEffect} from 'react'
//import axios from 'axios'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/de-ch'; 
//Calender CSS-Styling
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default function CalendarApp() {

    const [apiResponse, setapiResponse] = useState([{id: 0, start: moment().toDate(), end: moment().add(7, "days").toDate(), title: "Termine werden geladen..."}])

    const api_key = process.env.REACT_APP_TEAMUP_API_KEY
    const cal_key = process.env.REACT_APP_TEAMUP_CALKEY

    //React-Big-Calendar Stuff

    //Moment-Localizer
    const localizer = momentLocalizer(moment);


    function handleEvents(rawEvents) {
        let event_id = 0
        const formatedEvnts = rawEvents.map(evnt => {
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

    useEffect(() => {
        fetch(`https://api.teamup.com/${cal_key}/events?startDate=2020-02-08&endDate=2021-08-12`, {credentials: "omit", method: "get", headers: {"Teamup-Token": api_key}})
        .then(response => response.json())
        .then(data => {
            console.log(data.events)
            handleEvents(data.events)
            //setapiResponse(data.events)
        })
        .catch(err => console.log(err))
    }, [cal_key, api_key])

    /*function CheckAccess () {
        fetch(`https://api.teamup.com/check-access`, api_config)
        .then(response => response.json())
        .then(data => {
            
        })
        .catch(err => console.log(err))
    }*/

    const messages = { // new
        allDay: 'ganzer Tag',
        previous: 'Vorherig',
        next: 'Nächster',
        today: 'Heute',
        month: 'Monat',
        week: 'Woche',
        day: 'Tag',
        agenda: 'Agenda',
        date: 'Datum',
        time: 'Zeit',
        event: 'Termin',
      };

    return (
        <div style={(window.innerWidth <= 520) ? {paddingTop: "10px"} : {paddingTop: "30px"}}>
            <Calendar 
            popup
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            events={apiResponse}
            style={(window.innerWidth) ? {height: "600px", margin: "2px 10px 2px 10px"} : {height: "600px", margin: "10px 30px 10px 30px"}}
            />
        </div>
    )
}
