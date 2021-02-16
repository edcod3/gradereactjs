export function capitalize(string) {
	if (string.includes("_")) {
		let newstring = string.replace("_", " ")
		return newstring.replace(/\w\S*/g, (w) =>
			w.replace(/^\w/, (c) => c.toUpperCase())
		)
	} else {
		return string.replace(/\w\S*/g, (w) =>
			w.replace(/^\w/, (c) => c.toUpperCase())
		)
	}
}

//Format Date from MySQL DB to local format
export function FormatDate(rawdate) {
	let formateddate = rawdate.split(".")
	let newdate =
		formateddate[2] + "-" + formateddate[1] + "-" + formateddate[0]
	return newdate
}

//Function to handle Form Inputs (with useState)
export function setInput(setState, event) {
	setState((oldVal) => ({
		...oldVal,
		[event.target.name]: event.target.value
	}))
}

//Get formatted subject name from raw subject name
export function SubjName(rawsubj) {
	const tables = {
		app_development: "App Entwicklung",
		economics: "Wirtschaft/Recht",
		english: "Englisch",
		finances: "Finanz-/Rechnungswesen",
		french: "Französisch",
		german: "Deutsch",
		history: "Geschichte",
		mathematics: "Mathematik",
		sports: "Sport",
		system_technology: "Systemtechnik"
	}
	return tables[rawsubj]
}

//Get raw subject name from formatted subject name
export function ReverseSubjName(rawsubj) {
	const tables = {
		"App Entwicklung": "app_development",
		"Wirtschaft/Recht": "economics",
		Englisch: "english",
		"Finanz-/Rechnungswesen": "finances",
		Französisch: "french",
		Deutsch: "german",
		Geschichte: "history",
		Mathematik: "mathematics",
		Sport: "sports",
		Systemtechnik: "system_technology"
	}
	return tables[rawsubj]
}

//Handle NodeJS Errors and Session Expiration
export function SessionLogout(err) {
	if (
		err.response.data.type === "not_loggedin" &&
		err.response.data.bool === true
	) {
		console.log("not logged in")
		sessionStorage.setItem("user", "")
		window.location.reload()
	} else {
		console.log(err.response.data)
	}
}

//Subject Tables
export const subjtables = [
	"app_development",
	"economics",
	"english",
	"finances",
	"french",
	"german",
	"history",
	"mathematics",
	"sports",
	"system_technology"
]
