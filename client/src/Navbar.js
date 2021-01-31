import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar(props) {
    return (
        <div className="topnav" id="topnav">
        <Link to="/home" className="active">Start</Link>
        <div className="dropdown">
        <Link to="/home" className="dropbtn">Deine Noten</Link>
        <div className="dropdown-content">
            <Link to="/german">Deutsch</Link>
            <Link to="/english">Englisch</Link>
            <Link to="/french">Französisch</Link>
            <Link to="/history">Geschichte</Link>
            <Link to="/economics">WIR</Link>
            <Link to="/finances">FRW</Link>
            <Link to="/mathematics">Mathematik</Link>
            <Link to="/system_technology">Systemtechnik</Link>
            <Link to="/app_development">App Entwicklung</Link>
            <Link className="unneccessary" to="/sports">Sport</Link>
        </div>
        </div>
        <Link to="/calculator">Noten-Rechner</Link>
        <button className="logout link-button" onClick={() => props.logout()}>Ausloggen</button>
        <p className="user user-p">{props.uname}</p>
    </div>
    )
}
