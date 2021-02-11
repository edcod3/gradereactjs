export function GetApiUrl () {
    const api_url = process.env.REACT_APP_API_URL
    //console.log(api_url)
    if (api_url === "localhost:8000" || api_url === undefined) {
        return "localhost:8000"
    } else {
        return api_url
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