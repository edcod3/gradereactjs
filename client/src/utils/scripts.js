export function capitalize(string) {
    if (string.includes("_")) {
        let newstring = string.replace("_", " ")
        return newstring.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    } else {
        return string.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    }
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