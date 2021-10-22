import React, {useState} from "react"
import ReactDOM from "react-dom"
import App from "./App"
//Using HashRouter for development
//Use BrowserRouter for production
import { HashRouter, BrowserRouter, useLocation } from "react-router-dom"
//React Alert Pop-Up
import { transitions, positions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from "./utils/alert-template"
import { useMediaQuery } from "./utils/customHooks"
import "./assets/styles.css"

//Use PageLocation for different login/other page(s) CSS styling
function PageLocation() {
	let location = useLocation()
	React.useEffect(() => {
		//Conditional Body Styling based on location (CSS)
		if (location.pathname === "/login") {
			document.body.className = "login-body"
		} else {
			document.body.className = "main-body"
		}
	}, [location])
}

//FIXME: Don't trigger rerender when dark mode toggle is clicked.
function SetColorTheme() {

	const [isDark, setIsDark] = useState("light")

	let systemPrefersDark = useMediaQuery('(prefers-color-scheme: dark)');
	console.log(systemPrefersDark)

	React.useEffect(() => {

		//Styling based on color scheme
		setIsDark(systemPrefersDark ? "dark": "light")
		document.body.setAttribute("data-theme", isDark)
	}, [systemPrefersDark, isDark])
	return [isDark, setIsDark]
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


//Integrate PageLocation Function into & add dark/light mode to App.js 
function Main() {
	PageLocation()

	let [isDark, setIsDark] = SetColorTheme()
	let darkStateProps = {
		"isDark": isDark,
		"setIsDark": setIsDark
	}

	return <App {...darkStateProps}/>
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
