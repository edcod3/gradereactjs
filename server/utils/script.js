const crypto = require("crypto");
//Function Exports
//Crypto Stuff
module.exports.Hash = async function (passw) {
	return new Promise((resolve, reject) => {
		const salt = crypto.randomBytes(16).toString("hex");
		crypto.scrypt(passw, salt, 128, (err, hashkey) => {
			if (err) reject(err);
			var result = salt + ":" + hashkey.toString("hex");
			resolve(result);
		});
	});
};

module.exports.Verify = async function (passw, hashedpw) {
	return new Promise((resolve, reject) => {
		const [newsalt, newkey] = hashedpw.split(":");
		crypto.scrypt(passw, newsalt, 128, (err, verifyKey) => {
			if (err) reject(err);
			resolve(newkey == verifyKey.toString("hex"));
		});
	});
};

module.exports.genToken = function () {
	return crypto.randomBytes(64).toString("hex");
};

module.exports.GetUrlValues = function (URLQuery) {
	var url_name = URLQuery.substring(1);
	return url_name;
};

module.exports.capitalize = function (string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports.pathExtract = function (ref, origin) {
	var path = ref.replace(new RegExp(origin, "g"), "");
	return path.replace("/", "");
};

function DateFormat(date) {
	let curr_date = new Date(date);
	curr_date.setDate(curr_date.getDate() + 1);
	let new_date = curr_date.toISOString();
	return new_date;
}

module.exports.GetSQLValues = function (result2) {
	//var sqldate = JSON.stringify(result2.date);
	var sqldate =
		result2.date == "0000-00-00" ? "Kein Datum" : DateFormat(result2.date);
	//console.log(result2.date)
	var sqldesc = JSON.stringify(result2.desc);
	var sqldate2 = sqldate.replace(/['"]+/g, "").split("T")[0].split("-");
	var trueValues = {
		id: JSON.stringify(result2.id),
		weight: JSON.stringify(result2.weight),
		grade: JSON.stringify(result2.grade),
		date: sqldate2[2] + "." + sqldate2[1] + "." + sqldate2[0],
		desc: sqldesc.replace(/['"]+/g, "")
	};
	return trueValues;
};
/* ------------------------------------------------ */

//HomeAvg-Stuff
//Home Other Functions
function CalcPoints(val) {
	var roundedGrade = Math.round(val * 2) / 2;
	if (roundedGrade >= 4) {
		var TrueRoundedGrade = roundedGrade % 4;
	} else if (roundedGrade >= 3) {
		var TrueRoundedGrade = (roundedGrade % 3) - 1;
	} else if (roundedGrade >= 2) {
		var TrueRoundedGrade = (roundedGrade % 1) - 2;
	} else if (roundedGrade >= 1) {
		var TrueRoundedGrade = (roundedGrade % 1) - 3;
	} else {
		var TrueRoundedGrade = NaN;
	}
	return TrueRoundedGrade;
}

function CalculateweightedGrades2(weightFiltered, gradeValues) {
	var weightedGrades = [];
	for (
		let i = 0;
		i < Math.min(gradeValues.length, weightFiltered.length);
		i++
	) {
		let weightedGrade = gradeValues[i] * weightFiltered[i];
		weightedGrades.push(weightedGrade);
	}
	if (gradeValues.length >= 1) {
		let WeightedGradeSum = weightedGrades.reduce((a, b) => a + b);
		let weight_sum = weightFiltered.reduce((a, b) => a + b);
		let raw_avg = WeightedGradeSum / weight_sum;
		const avg = raw_avg.toFixed(2);
		return avg;
	} else {
		return "NaN";
	}
}

const tables = new Array(
	"app_development",
	"economics",
	"english",
	"finances",
	"french",
	"german",
	"history",
	"mathematics",
	"sports",
	"system_technology",
	"t_u"
);
const germtables = new Array(
	"App Entwicklung (St)",
	"Wirtschaft/Recht",
	"Englisch",
	"Finanz-/Rechnungswesen",
	"Französisch",
	"Deutsch",
	"Geschichte",
	"Mathematik",
	"Sport",
	"App Entwicklung (Lu)",
	"Technik & Umwelt"
);

function OutputSubj(rawsubj) {
	for (let i = 0; i < tables.length; i++) {
		if (rawsubj == tables[i]) {
			return germtables[i];
		}
	}
}

//GetDomain Function
module.exports.GetDomain = function () {
	if (process.env.NODE_ENV == "production") {
		var sess_domain = process.env.SESS_DOMAIN;
		var sess_opts = {
			maxAge: 1800000,
			httpOnly: true,
			sameSite: true,
			secure: true,
			domain: sess_domain
		};
	} else if (process.env.NODE_ENV == "production-test") {
		var sess_domain = process.env.SESS_DOMAIN;
		var sess_opts = {
			maxAge: 1800000,
			httpOnly: true,
			sameSite: false,
			secure: false,
			domain: sess_domain
		};
	} else if (process.env.NODE_ENV == "reactdev") {
		var sess_domain = process.env.SESS_DOMAIN || "";
		var sess_opts = {
			maxAge: 1800000,
			httpOnly: true,
			sameSite: false,
			domain: sess_domain
		};
	} else {
		var sess_domain = process.env.SESS_DOMAIN || "";
		var sess_opts = {
			maxAge: 1800000,
			httpOnly: true,
			sameSite: true,
			domain: sess_domain
		};
	}
	return sess_opts;
};

//Home Function
module.exports.HomeAvg = function (weight, grades, subj) {
	//var gradeCalculatedValues = CalculateweightGrade(weight, grades);
	var AvgGrade = CalculateweightedGrades2(weight, grades);
	//var AvgGrade = GetAvg(gradeCalculatedValues);
	var SubjPoints = CalcPoints(AvgGrade);
	var germsubj = OutputSubj(subj);
	var AvgObj = {
		subject: germsubj,
		grade: AvgGrade,
		points: SubjPoints
	};
	return AvgObj;
};

module.exports.tables = tables;
