import { React, useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { subjtables, SubjName } from "./utils/scripts"
import { useTheme } from "./utils/ThemeProvider"
import Toggle  from "react-toggle"
import "./assets/react-toggle.css"

export default function Navbar(props) {
	//State for navbar class (sticky / nonsticky)
	const [navclass, setnavclass] = useState("topnav")
	//State for mobile formatting
	const [showMobile, setMobile] = useState(false)
	const [MobileDropdown, setMobileDropdown] = useState("")
	//Color Theme Styling
	const {theme, setTheme} = useTheme()
	//Location for conditional sticky navbar
	let location = useLocation()

	useEffect(() => {
		// Get Current Location
		let subj = location.pathname.replace("/", "")
		//console.log(subj)
		//Only apply sticky navbar to subject locations & calendar
		if ((subjtables.includes(subj) || subj.includes("calendar")) && window.innerWidth > 520) {
			setnavclass("topnav sticky")
		} else {
			setnavclass("topnav")
		}
	}, [location])

	return (
		<div className={navclass} id="topnav">
			{window.innerWidth <= 520 ? (
				<button
					className="link-button active"
					onClick={() => setMobile(!showMobile)}>
					<i className="material-icons" id="nav_arrow">
						{showMobile ? "expand_less" : "expand_more"}
					</i>
				</button>
			) : (
				<Link to="/home" className="active">
					Start
				</Link>
			)}
			{window.innerWidth <= 520 ? (
				<>
					<button
						className="logout link-button"
						onClick={() => props.logout()}>
						Ausloggen
					</button>
					<p className="user user-p">{props.uname}</p>
					<label>
						<Toggle
							className="dark-mode-toggle logout"
							checked={(theme === "dark") ? true : false}
							onChange={({ target }) => setTheme(target.checked ? "dark" : "light")}
							icons={{ checked: "🌙", unchecked: "☀️" }}
							aria-label="Dark mode toggle"
						/>
					</label>
					<div
						className={
							showMobile ? "mobile_menu_show" : "mobile_menu_hide"
						}>
						<Link to="/home" className="mobile_active">
							Start
						</Link>
						<div className="dropdown">
							<button
								className="dropbtn link-button"
								onClick={() =>
									(MobileDropdown === "subj") ? setMobileDropdown("") : setMobileDropdown("subj")
								}>
								Deine Noten
								<i
									className="material-icons"
									id="dropdown_arrow">
									{(MobileDropdown === "subj")
										? "arrow_drop_up"
										: "arrow_drop_down"}
								</i>
							</button>
							<div
								className="dropdown-content"
								style={
									(MobileDropdown === "subj")
										? { display: "block" }
										: { display: "none" }
								}>
								{subjtables.map((subj, i) => {
									if (subj !== "sports") {
										return (
											<Link to={subj} key={"subj"+i} onClick={() => {setMobileDropdown("");setMobile(!showMobile)}}>{SubjName(subj)}</Link>
										)
									} else {
										return (
											<Link className="unneccessary" to="/sports" key={"subj"+i} onClick={() => {setMobileDropdown("");setMobile(!showMobile)}}>Sport</Link>
										)
									}
								})}
							</div>
						</div>
						<Link to="/calculator">Noten-Rechner</Link>
						<div className="dropdown">
							<button
								className="dropbtn link-button"
								onClick={() =>
								(MobileDropdown === "cal") ? setMobileDropdown("") : setMobileDropdown("cal")
								}>
								Kalendar
								<i
									className="material-icons"
									id="dropdown_arrow">
									{(MobileDropdown === "cal")
										? "arrow_drop_up"
										: "arrow_drop_down"}
								</i>
							</button>
							<div
								className="dropdown-content"
								style={
									(MobileDropdown === "cal")
										? { display: "block" }
										: { display: "none" }
								}>
								<Link to="/calendar" onClick={() => {setMobileDropdown("");setMobile(!showMobile)}}>Anzeigen</Link>
								<Link to="/calendar?export" onClick={() => {setMobileDropdown("");setMobile(!showMobile)}}>Exportieren</Link>
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="dropdown">
						<Link to="/home" className="dropbtn">
							Deine Noten
						</Link>
						<div className="dropdown-content">
							{subjtables.map((subj, i) => {
								if (subj !== "sports") {
									return (
										<Link to={subj} key={"subj"+i}>{SubjName(subj)}</Link>
									)
								} else {
									return (
										<Link className="unneccessary" to="/sports" key={"subj"+i}>Sport</Link>
									)
								}
							})}
						</div>
					</div>
					<Link to="/calculator">Noten-Rechner</Link>
					<div className="dropdown">
						<Link to="/calendar" className="dropbtn">
							Kalendar	
						</Link>
						<div className="dropdown-content">
							<Link to="/calendar?export">Kalendar exportieren</Link>
						</div>
					</div>
					<button
						className="logout link-button"
						onClick={() => props.logout()}>
						Ausloggen
					</button>
					<p className="user user-p">{props.uname}</p>
					<label>
						<Toggle
							className="dark-mode-toggle logout"
							checked={(theme === "dark") ? true : false}
							onChange={({ target }) => setTheme(target.checked ? "dark" : "light")}
							icons={{ checked: "🌙", unchecked: "☀️" }}
							aria-label="Dark mode toggle"
						/>
					</label>
				</>
			)}
		</div>
	)
}
