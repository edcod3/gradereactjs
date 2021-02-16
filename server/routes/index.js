//Module Imports (npm)
const express = require("express");
const router = express.Router();
//Middleware Imports
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//File Imports
const services = require("../functions");
const scripts = require("../utils/script");
const db = require("../db");

//Router Usages
router.use(cookieParser());
router.use(bodyParser.json());

//Enable CORS-Policy request (ReactJS fetch)
const corsOpts = {
	origin: [
		`http://${process.env.REACT_URL}`,
		`https://${process.env.REACT_URL}`
	],
	methods: ["GET", "HEAD", "PUT", "POST", "DELETE", "OPTIONS"],
	credentials: true
};
router.use(cors(corsOpts));

//Use Mysql Connection Pool from ../db
router.use(function (req, res, next) {
	res.locals.con = db.con_pool;
	next();
});

//Session Creation
router.use(
	session({
		name: "sid",
		secret: process.env.SID_SECRET,
		store: db.sessionStore,
		resave: true,
		saveUninitialized: true,
		//proxy: true,
		cookie: scripts.GetDomain()
	})
);

/* Subjects */
router.get("/", function (req, res) {
	res.redirect("/api/login");
});

router.get("/login", function (req, res) {
	//res.sendFile(__dirname + "/public/" + "login.html");
	if (req.session.loggedin) {
		res.redirect("/home");
	} else {
		const notloggedin_json = {
			message: "You are not logged in",
			type: "not_loggedin",
			bool: true
		};
		res.status(400).json(notloggedin_json);
	}
});

router.post("/login", function (req, res) {
	services.Login(req, res);
});

router.post("/register", function (req, res) {
	services.Register(req, res);
});

router.get("/logout", function (req, res) {
	req.session.destroy();
	res.status(200).json({ type: "loggedout", bool: true });
});

router.get("/home", function (req, res) {
	//console.log(req.session);
	if (req.session.loggedin) {
		services.Home(req, res);
	} else {
		//console.log("Auth didnt work");
		res.redirect("/api/login");
	}
});

router.get("/german", function (req, res) {
	if (req.session.loggedin) {
		services.ShowGrades(req, res);
	} else {
		res.redirect("/api/login");
	}
});

router.get("/english", function (req, res) {
	if (req.session.loggedin) {
		services.ShowGrades(req, res);
	} else {
		res.redirect("/api/login");
	}
});

router.get("/french", function (req, res) {
	if (req.session.loggedin) {
		services.ShowGrades(req, res);
	} else {
		res.redirect("/api/login");
	}
});

router.get("/history", function (req, res) {
	if (req.session.loggedin) {
		services.ShowGrades(req, res);
	} else {
		res.redirect("/api/login");
	}
});

router.get("/economics", function (req, res) {
	if (req.session.loggedin) {
		services.ShowGrades(req, res);
	} else {
		res.redirect("/api/login");
	}
});

router.get("/finances", function (req, res) {
	if (req.session.loggedin) {
		services.ShowGrades(req, res);
	} else {
		res.redirect("/api/login");
	}
});

router.get("/mathematics", function (req, res) {
	if (req.session.loggedin) {
		services.ShowGrades(req, res);
	} else {
		res.redirect("/api/login");
	}
});

router.get("/system_technology", function (req, res) {
	if (req.session.loggedin) {
		services.ShowGrades(req, res);
	} else {
		res.redirect("/api/login");
	}
});

router.get("/app_development", function (req, res) {
	if (req.session.loggedin) {
		services.ShowGrades(req, res);
	} else {
		res.redirect("/api/login");
	}
});

router.get("/sports", function (req, res) {
	if (req.session.loggedin) {
		services.ShowGrades(req, res);
	} else {
		res.redirect("/api/login");
	}
});

/* ----------------- */

/* GradeJS Managment */

//Subject/Grade Upload
router.post("/subj_upload", function (req, res) {
	if (req.session.loggedin) {
		services.UploadGrades(req, res);
	} else {
		res.redirect("/api/login");
	}
});

//Grade Update
router.post("/subj_update", function (req, res) {
	if (req.session.loggedin) {
		services.UpdateGrades(req, res);
	} else {
		res.redirect("/api/login");
	}
});

//Grade Deletion
router.post("/subj_delete", function (req, res) {
	if (req.session.loggedin) {
		services.DeleteGrade(req, res);
	} else {
		res.redirect("/api/login");
	}
});

//-----------------------------------------//

/* Robots.txt */
router.get("/robots.txt", function (req, res) {
	res.sendFile(__dirname + "/public/robots.txt");
});

/* Redirect missing routes to home */
router.get("/*", function (req, res) {
	if (req.session.loggedin) {
		res.redirect("/api/home");
	} else {
		res.redirect("/api/login");
	}
});

module.exports = router;
