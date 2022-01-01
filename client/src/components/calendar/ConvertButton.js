export default function ConvertButton(props) {
    //Adjust newline based on OS
    const platform = window.navigator.platform
    const delimiter = (platform.includes("Win")) ? "\r\n" : "\n";

    //ICS header
    let icsBlob = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Teamup Converter//edcod3//DE",
        "X-WR-CALNAME: Teamup Events",
        "NAME: Teamup Events",
        "CALSCALE:GREGORIAN",
        "BEGIN:VTIMEZONE",
        "TZID:Europe/Berlin",
        "TZURL:http://tzurl.org/zoneinfo-outlook/Europe/Berlin",
        "X-LIC-LOCATION:Europe/Berlin",
        "BEGIN:DAYLIGHT",
        "TZOFFSETFROM:+0100",
        "TZOFFSETTO:+0200",
        "TZNAME:CEST",
        "DTSTART:19700329T020000",
        "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
        "END:DAYLIGHT",
        "BEGIN:STANDARD",
        "TZOFFSETFROM:+0200",
        "TZOFFSETTO:+0100",
        "TZNAME:CET",
        "DTSTART:19701025T030000",
        "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
        "END:STANDARD",
        "END:VTIMEZONE"].join(delimiter)+delimiter;

    const isoToIcsDate = (date) => date.replaceAll("-", "").replaceAll(":", "").split(".")[0]+"Z"
    const removeHtmlDesc = (text) => text.replaceAll("<p>", "").replaceAll("</p>", "")

    //Convert event to ics format
    const getEventIcs = (event) => {
       let timestamp = new Date(event.creation_dt)

        let startTime = new Date(event.start_dt)
        let endTime = new Date(event.end_dt)

        let eventIcs = [
            "BEGIN:VEVENT",
            `SUMMARY:${event.title}`,
            "LOCATION:",
            `DTSTAMP:${isoToIcsDate(timestamp.toISOString())}`,
            `UID:evt${event.id}@${process.env.REACT_APP_DOMAIN_NAME}`,
            `DTSTART:${isoToIcsDate(startTime.toISOString())}`,
            `DTEND:${isoToIcsDate(endTime.toISOString())}`,
            `DESCRIPTION:${(event.notes) ? removeHtmlDesc(event.notes) : ""}`,
            `END:VEVENT`
        ].join(delimiter)
        return eventIcs + delimiter 
    }

    //Save ICS file with filename
    const save = (fileName, data) => {
        let link = document.createElement('a')
        link.download = fileName
        link.href = "data:text/calendar;charset=utf8,"+data
        link.click()
    }

    //Team-Up to ICS file
    const converter = () => {
        const events = props.events
        for (let i = 0; i < events.length; i++) {
            icsBlob += getEventIcs(events[i]);
        }
        icsBlob += "END:VCALENDAR"
        save("calendar.ics", icsBlob)
   }   

    return (
        <button className="tu_btn converter" onClick={converter}>
            <span className="material-icons">file_download</span>
            <p> .ics herunterladen</p>
        </button>
    )
}