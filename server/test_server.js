var express = require('express');
const app = express();

app.get('/login', function (req, res) {
    res.sendFile(__dirname + "/public/" + "login.html");
})
app.listen(8000, () => {
	console.log("Server started on Port 8000");
});