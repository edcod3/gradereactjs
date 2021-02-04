export function capitalize(string) {
    if (string.includes("_")) {
        let newstring = string.replace("_", " ")
        return newstring.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    } else {
        return string.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    }
}

export function FormatDate(rawdate) {
    let formateddate = rawdate.split(".");
    let newdate = formateddate[2] + "-" + formateddate[1] + "-" + formateddate[0];
    return newdate
}

export function SubjName (rawsubj) {
    const tables =  {
                    app_development: "App Entwicklung",
                    economics: "Wirtschaft/Recht",
                    english: "Englisch" ,
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

export function SessionLogout(err) {
    if (err.response.data.type === "not_loggedin" && err.response.data.bool === true) {
        console.log("not logged in")
        sessionStorage.setItem('user', '')
        window.location.reload()
    } else {
        console.log(err.response.data)
    }
}

export const subjtables = ["app_development","economics","english","finances","french","german","history","mathematics","sports","system_technology"]