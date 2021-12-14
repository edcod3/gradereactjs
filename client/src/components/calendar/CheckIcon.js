import "./css/CheckIcon.css";

export function CheckEvents(props) {
    return (
        <>
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <h2 id="tu-check-msg">{(props.eventCount === 1) ? "1 Datum" : `${props.eventCount} Daten`} gefunden!</h2>
        </>
    )
}

export function ErrorEvents() {
    return (
    <>
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="25" fill="none" className="checkmark__circle checkmark__cross" />
            <path fill="none" d="M 12,12 L 40,40 M 40,12 L 12,40" className="checkmark__check" />
        </svg>
        <h2 id="tu-check-msg">Keine Kalenderdaten gefunden... Überprüfe dein Datum!</h2>
    </>   
    )
}