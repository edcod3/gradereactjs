const fetch = require("node-fetch");
const script = require("../utils/script");

function DuplUser(res, uname) {
	return new Promise((resolve, reject) => {
		res.locals.con.query(
			"SELECT uname FROM users WHERE uname = ?",
			[uname],
			function (err, result) {
				if (err) {
					return ErrHandler(res, err);
				}
				if (result.length <= 0) {
					resolve();
				} else {
					reject();
				}
			}
		);
	});
}

module.exports.Register = function (req, res) {
	//console.log("async started");
	//console.log(req)
	var user = {
		uname: req.body.username_reg,
		passw: req.body.password_reg,
		email: req.body.email
	};
	DuplUser(res, user.uname)
		.then(async () => {
			//console.log("No Duplicate User")
			var hashedpass = await script.Hash(user.passw);
			var utoken = script.genToken();
			res.locals.con.query(
				"INSERT INTO `users`(`uname`, `email`, `pass`, `token`) VALUES (?,?,?,?)",
				[user.uname, user.email, hashedpass, utoken],
				function (err, result) {
					if (err) {
						return ErrHandler(res, err);
					}
					//ShowSuccess(res);
					const success = {
						type: "reg_success",
						bool: true
					};
					//console.log("Succesfully added user:" + user.uname)
					res.json(success);
				}
			);
		})
		.catch(() => {
			//console.log("Duplicate User found");
			const dupluser = {
				type: "reg_dupluser",
				bool: true
			};
			//console.log(user.uname + "already exists")
			res.json(dupluser);
		});
};

module.exports.Login = function (req, res) {
	var uname = req.body.username;
	var passw = req.body.password;
	res.locals.con.query(
		"SELECT uname, pass, token FROM users WHERE uname = ?",
		[uname],
		function (err, result) {
			if (err) {
				return ErrHandler(res, err);
			}
			//console.log(result);
			if (result.length <= 0) {
				const nouser = {
					type: "login_nouser",
					bool: true
				};
				res.json(nouser);
			} else {
				async function checkpass() {
					var checked = await script.Verify(passw, result[0].pass);
					var headers = {
						right: checked,
						user: uname,
						token: result[0].token
					};

					return headers;
				}
				checkpass().then((result) => {
					if (result.right) {
						req.session.loggedin = true;
						req.session.username = result.user;
						req.session.token = result.token;
						const login_success = {
							type: "login_success",
							username: result.user
						};
						res.json(login_success);
						//console.log(result.user + "logged in!")
					} else {
						const login_failed = {
							type: "login_failed",
							bool: true
						};
						res.json(login_failed);
					}
				});
			}
		}
	);
};

//Functions
module.exports.Home = function (req, res) {
	var outputs = [];
	var AllSubjs = new Promise((resolve, reject) => {
		script.tables.forEach((table) => {
			var totgrades = [];
			var totweight = [];
			var wg_query = res.locals.con.query(
				"SELECT weight, grade FROM " + table + " WHERE token = ?;",
				[req.session.token]
			);
			wg_query.on("error", (res, err) => {
				return ErrHandler(res, err);
			});
			wg_query.on("result", (row) => {
				totgrades.push(row.grade);
				totweight.push(row.weight);
			});
			wg_query.on("end", () => {
				var pointsavg = script.HomeAvg(totweight, totgrades, table);
				outputs.push(pointsavg);
				if (script.tables.length == outputs.length) {
					resolve("All Subject Data retrieved for Home!");
				}
			});
		});
	});
	AllSubjs.then(() => {
		const json = {
			response: outputs
		};
		//console.log(json);
		res.json(json);
	});
};

module.exports.ShowGrades = function (req, res) {
	//var html_rows = [];
	let subj_row_output = [];
	var db_name = script.GetUrlValues(req.path);
	res.locals.con.query(
		"SELECT * FROM ?? WHERE token = ?;",
		[db_name, req.session.token],
		function (err, result) {
			if (err) {
				return ErrHandler(res, err);
			}
			var newHTML = new Promise((resolve, reject) => {
				result.forEach((result2) => {
					var trueVals = script.GetSQLValues(result2);
					subj_row_output.push(trueVals);
				});
				resolve("HTML Changed!");
			});
			newHTML.then(() => {
				const json_output = {
					response: subj_row_output
				};
				//console.log(json_output)
				res.json(json_output);
			});
		}
	);
};

module.exports.UploadGrades = function (req, res) {
	//console.log(req.body);
	var ins = {
		date: req.body.date,
		desc: req.body.desc,
		weight: req.body.weight,
		grade: req.body.grade
	};
	var table_name = req.body.subject;
	res.locals.con.query(
		"INSERT INTO ?? (`date`, `desc`, `weight`, `grade`, `token`) VALUES (?,?,?,?,?)",
		[
			table_name,
			ins.date,
			ins.desc,
			ins.weight,
			ins.grade,
			req.session.token
		],
		function (err, result) {
			if (err) {
				return ErrHandler(res, err);
			}
			const success_json = {
				type: "inserted_grade",
				bool: true,
				subject: table_name
			};
			//console.log(success_json);
			res.json(success_json);
			//console.log(result);
		}
	);
};

module.exports.UpdateGrades = function (req, res) {
	//console.log(req.body);
	let updarray = [
		req.body.table,
		req.body.date,
		req.body.desc,
		req.body.weight,
		req.body.grade,
		req.body.id,
		req.session.token
	];
	res.locals.con.query(
		"UPDATE ?? SET `date`=?, `desc`=?, `weight`=?, `grade`=? WHERE `id`=? AND `token`=?",
		updarray,
		function (err, result) {
			if (err) {
				return ErrHandler(res, err);
			}
			const updated_json = {
				type: "updated_grade",
				bool: true
			};
			//console.log(updated_json);
			res.json(updated_json);
		}
	);
};

module.exports.DeleteGrade = function (req, res) {
	//console.log(req.body);
	let sqldelarray = [req.body.table, req.body.index, req.session.token];
	res.locals.con.query(
		"DELETE FROM ?? WHERE `id`=? AND `token`=?",
		sqldelarray,
		function (err, result) {
			if (err) {
				return ErrHandler(res, err);
			}
			const deleted_json = {
				type: "deleted_grade",
				bool: true
			};
			//console.log(deleted_json);
			res.json(deleted_json);
		}
	);
};

module.exports.GetCalAuth = function (req, res) {
	fetch(`https://api.teamup.com/${process.env.TEAMUP_CALKEY}/configuration`, {
		credentials: "omit",
		method: "get",
		headers: { "Teamup-Token": process.env.TEAMUP_API_KEY }
	})
		.then((response) => response.json())
		.then(async (json) => {
			const auth_res = json.configuration.general_settings.admin_email.split(
				"@"
			)[0];
			const hashres = await script.Hash(auth_res);
			const checklogin = await script.Verify(req.body.cal_login, hashres);
			if (checklogin) {
				const json_success = {
					auth_succ: checklogin,
					auth_check_hash: json.configuration.identity.title
				};
				res.json(json_success);
			} else {
				const json_fail = {
					auth_succ: checklogin
				};
				res.json(json_fail);
			}
		})
		.catch((err) => ErrHandler(res, err));
};

module.exports.CheckCalAuth = function (req, res) {
	fetch(`https://api.teamup.com/${process.env.TEAMUP_CALKEY}/configuration`, {
		credentials: "omit",
		method: "get",
		headers: { "Teamup-Token": process.env.TEAMUP_API_KEY }
	})
		.then((response) => response.json())
		.then((json) => {
			if (
				req.header("Check-Token") == json.configuration.identity.title
			) {
				const json_check_succ = {
					auth_check: true
				};
				res.json(json_check_succ);
			} else {
				const json_check_fail = {
					auth_check: false
				};
				res.json(json_check_fail);
			}
		})
		.catch((err) => ErrHandler(res, err));
};

//Error Handling

function ErrHandler(res, err) {
	console.error("Fuck, there was an error...\n", err);
	res.redirect("/api/home");
	return;
}

module.exports.DuplUser = DuplUser;
module.exports.ErrHandler = ErrHandler;
