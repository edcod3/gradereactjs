import {React, useState} from 'react'
import {Link} from 'react-router-dom'

export default function Navbar(props) {
    const [showMobile, setMobile] = useState(false)
    const [MobileDropdown, setMobileDropdown] = useState(false)
    return (
        <div className="topnav" id="topnav">
        {(window.innerWidth <= 480) ? <button className="link-button active" onClick={() => setMobile(!showMobile)}><i className="material-icons" id="nav_arrow">{showMobile ? "expand_less" : "expand_more"}</i></button> : <Link to="/home" className="active">Start</Link> }
        {(window.innerWidth <= 480) 
          ?  <>
            <button className="logout link-button" onClick={() => props.logout()}>Ausloggen</button>
            <p className="user user-p">{props.uname}</p>
            <div className={showMobile ? "mobile_menu_show" : "mobile_menu_hide"}>
            <Link to="/home" className="mobile_active">Start</Link>
            <div className="dropdown">
                <button className="dropbtn link-button" onClick={() => setMobileDropdown(!MobileDropdown)}>Deine Noten<i className="material-icons" id="dropdown_arrow">{MobileDropdown ? "arrow_drop_up" : "arrow_drop_down"}</i></button>
                <div className="dropdown-content" style={MobileDropdown ? {display: "block"} : {display: "none"}}>
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
            </div>
            </>
        :   <>
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
            </>
        }
    </div>
    )
}
