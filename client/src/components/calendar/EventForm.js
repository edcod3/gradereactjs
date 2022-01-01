import {useState} from "react";
import {CheckEvents, ErrorEvents} from "./CheckIcon";
import ConvertButton from "./ConvertButton";
import "./css/EventForm.css";

export default function EventForm() {
    const [events, setEvents] = useState([]);
    const [inputs, setInputs] = useState({});
    const [gotEvents, setGotEvents] = useState(null);
    
    const apiToken = process.env.REACT_APP_TEAMUP_API_KEY
    const calId = process.env.REACT_APP_TEAMUP_CALKEY

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        getEvents();
    }

    const getEvents = () => {
        const url = `https://api.teamup.com/${calId}/events?startDate=${inputs.startDate}&endDate=${inputs.endDate}`
        fetch(url, {
            credentials: "omit",
            method: "get",
            headers: {
                "Teamup-Token": apiToken
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (!data.events) {
                setGotEvents(false)
                return
            }
            setEvents(data.events)
            setGotEvents(true)
        })
    }

    const showForm = () => {
        return (
            <div className="tu-wrapper" id="form-div">
            <h2>Kalendardaten exportieren</h2>
            <form onSubmit={handleSubmit}>
               <label htmlFor="cal-start-date">Start datum:</label>
                <input 
                    type="date" 
                    id="cal-start-date" 
                    name="startDate"
                    value={inputs.startDate || ""}
                    onChange={handleChange}
                />
                <label htmlFor="cal-end-date">End datum:</label>
                <input
                    type="date"
                    id="cal-end-date"
                    name="endDate"
                    value={inputs.endDate || ""}
                    onChange={handleChange}
                />
                <button type="submit" className="tu_btn btn_export">
					<span id="export">Exportieren</span>
				</button>
            </form>
        </div>
        )
    }

    return (
        <>
        <br />
        <br />
        {(gotEvents !== null) ? 
            (gotEvents) 
            ? 
                <div className="tu-wrapper" id="check-div">
                    <CheckEvents className="event-check" eventCount={events.length}/>
                    <ConvertButton events={events} calId={inputs.calId}/>
                </div>
            :
            <ErrorEvents />
        : 
        showForm()}
        </>
    )
}