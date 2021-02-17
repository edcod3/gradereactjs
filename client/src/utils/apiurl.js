//Get NodeJS API URL (if none set -> set localhost:8000)
export function GetApiUrl() {
	const api_url = process.env.REACT_APP_API_URL
	const env = process.env.NODE_ENV
	if (
		(api_url === "localhost:8000" || api_url === undefined) &&
		env !== "production"
	) {
		return "localhost:8000"
	} else {
		return api_url
	}
}
