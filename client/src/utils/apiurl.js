export function GetApiUrl () {
    const api_url = process.env.REACT_APP_API_URL
    if (api_url === "localhost" || api_url === undefined || api_url !== "network") {
        return "localhost:8000"
    } else {
        return  api_url + ":8000"
    }
}

export function GetApiUrlOriginal () {
    const api_url = process.env.REACT_APP_API_URL
    if (api_url !== "localhost" || api_url) {
        return api_url + ":8000"
    } else {
        return "localhost:8000"
    }
}