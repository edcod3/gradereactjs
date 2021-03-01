import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
//Using HashRouter for development
//Use BrowserRouter for production
import { HashRouter, BrowserRouter, useLocation } from "react-router-dom"
//React Alert Pop-Up
import { transitions, positions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from "./utils/alert-template"
import "./assets/styles.css"

//Use PageLocation for different login/other page(s) CSS styling
function PageLocation() {
	let location = useLocation()
	React.useEffect(() => {
		//Conditional Body Styling (CSS)
		if (location.pathname === "/login") {
			document.body.className = "login-body"
		} else {
			document.body.className = "main-body"
		}
	}, [location])
}

//React-Alert Styling
const alert_opts = {
	// you can also just use 'bottom center'
	position: positions.TOP_CENTER,
	timeout: 5000,
	offset: "80px",
	//type: types.SUCCESS,
	// you can also just use 'scale'
	transition: transitions.FADE,
	containerStyle: {
		zIndex: 100
	}
}

//Integrate PageLocation Function into App.js
function Main() {
	PageLocation()
	return <App />
}

//Don't use React.StrictMode in Production (avoid error messages in console)
function ReactApp() {
	if (process.env.NODE_ENV === "production") {
		return (
			<AlertProvider template={AlertTemplate} {...alert_opts}>
				<BrowserRouter>
					<Main />
				</BrowserRouter>
			</AlertProvider>
		)
	} else {
		return (
			<React.StrictMode>
				<AlertProvider template={AlertTemplate} {...alert_opts}>
					<HashRouter basename="/">
						<Main />
					</HashRouter>
				</AlertProvider>
			</React.StrictMode>
		)
	}
}

//Render ReactApp Function
ReactDOM.render(<ReactApp />, document.getElementById("root"))
