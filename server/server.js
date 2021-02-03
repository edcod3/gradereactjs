//Modules
var express = require('express');
const app = express();
const session = require('express-session');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
var jsdom = require('jsdom');
require('dotenv').config()
const { JSDOM } = jsdom;



//Function Import
const script = require("./script");
const db = require("./db");


//Express Usages
//app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use('/assets', express.static("public/assets", {extensions:['html']}));
/*app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});*/

app.use(cookieParser());
app.use(bodyParser.json());

/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
        "Access-Control-Allow-Headers",
       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
    });
*/
//Enable CORS-Policy request (ReactJS fetch)
//const allowHosts = ["http://localhost:3000" , /http:\/\/localhost.*/]
//const HostsAllowed = ["http://localhost:3000", "http://localhost:3000/home", "http://localhost:3000/login"]
const corsOpts = {
    origin: ["http://localhost:3000"],
    methods: ["GET","HEAD","PUT","POST","DELETE", "OPTIONS"],
    credentials: true
}
app.use(cors(corsOpts));


//DB Stuff
const tables = new Array("app_development","economics","english","finances","french","german","history","mathematics","sports","system_technology");
app.use(function (req, res, next) {
    res.locals.con = db.con_pool;
    //res.locals.con.connect(function (err) {if (err) throw err;});
    next();
})

//Trust Nginx Proxy for secure cookies (Production)
if (process.env.NODE_ENV == "production") {
    app.set('trust proxy', 1);
}

//Session Creation
app.use(session({
    name: "sid",
    secret: process.env.SID_SECRET,
    store: db.sessionStore,
    resave: true,
    saveUninitialized: true,
    //proxy: true,
    cookie : db.GetDomain
}));


//JSDOM Variables
var uri_grades = "public/grades.html";
var uri_home = "public/home.html";
var uri_login = "public/login.html";
var uri_calc = "public/calculator.html";
var uri_upload = "public/upload.html";
var options = {
    runScripts: "dangerously",
    resources: "usable"
};
const subids = ["date", "desc", "weight", "grade"];
var dom_subjrow = new JSDOM(
`
<!DOCTYPE html>
<head></head>
<body>
<table>
<tr id="subj_row1">
<td id="subj_date1">23/11/2020</td>
<td id="subj_desc1">Test Grade</td>
<td id="subj_weight1" class="weight">1</td>
<td class="grade" id="subj_grade1">5.0</td>
</tr>
</table>
</body>
`);
var dom_homerow = new JSDOM(
`
<!DOCTYPE html>
<head></head>
<body>
<table>
<tr id="home_row1">
<td id="home_subject1">Test</td>
<td class="grade" id="home_grade1">5.0</td>
<td id="home_points1" class="weight">1</td>
</tr>
</table>
</body>
`);

//Routing
/* Subjects */
app.get('/', function (req, res) {
    res.redirect('/login');
})
app.get('/login', function (req, res) {
    res.sendFile(__dirname + "/public/" + "login.html");
})
app.post('/login', function(req, res) {
    Login(req, res);
})
app.post('/register', function (req, res) {
    Register(req, res);
})
app.get('/logout', function (req, res) {
    //Implement Logout JSON response
    req.session.destroy();
    res.redirect("/login");
})
app.get('/home', function(req, res) {
    console.log(req.session);
    if (req.session.loggedin) {
        Home(req, res);
    } else {
        console.log("Auth didnt work");
        res.redirect("/login");
    }
})
app.get('/german', function(req, res) {
    if (req.session.loggedin) {
        ShowGrades(req, res);
    } else {
        res.redirect("/login");
    }
})
app.get('/english', function (req, res) {
    if (req.session.loggedin) {
        ShowGrades(req, res);
    } else {
        res.redirect("/login");
    }
}) 
app.get('/french', function (req, res) {
    if (req.session.loggedin) {
        ShowGrades(req, res);
    } else {
        res.redirect("/login");
    }
}) 
app.get('/history', function (req, res) {
    if (req.session.loggedin) {
        ShowGrades(req, res);
    } else {
        res.redirect("/login");
    }
}) 
app.get('/economics', function (req, res) {
    if (req.session.loggedin) {
        ShowGrades(req, res);
    } else {
        res.redirect("/login");
    }
}) 
app.get('/finances', function (req, res) {
    if (req.session.loggedin) {
        ShowGrades(req, res);
    } else {
        res.redirect("/login");
    }
}) 
app.get('/mathematics', function (req, res) {
    if (req.session.loggedin) {
        ShowGrades(req, res);
    } else {
        res.redirect("/login");
    }
}) 
app.get('/system_technology', function (req, res) {
    if (req.session.loggedin) {
        ShowGrades(req, res);
    } else {
        res.redirect("/login");
    }
})
app.get('/app_development', function (req, res) {
    if (req.session.loggedin) {
        ShowGrades(req, res);
    } else {
        res.redirect("/login");
    }
}) 
app.get('/sports', function (req, res) {
    if (req.session.loggedin) {
        ShowGrades(req, res);
    } else {
        res.redirect("/login");
    }
}) 
app.get('/calculator', function (req, res) {
    if (req.session.loggedin) {
        Calculator(req, res);
    } else {
        res.redirect("/login");
    }
})

/* -------------- */

/* Subject Upload */

app.post('/subj_upload', function (req, res) {
    UploadGrades(req, res);
})

//Grade Update
app.post('/subj_update', function(req, res) {
    UpdateGrades(req, res)
})

/* ----------------- */

/* Test Stuff */
app.get('/test', function (req, res) {
    if (req.session.loggedin && req.session.username == "eddie") {
        ShowGrades(req, res);
    } else {
        res.redirect("/home");
    }
}) 
app.get('/hometest', function(req, res) {
    if (req.session.loggedin && req.session.username == "eddie") {
        Home(req, res);
    } else {
        res.redirect("/home");
    }
})


/* ------------------------ */

/*  Server/Event Functions  */

// Register Function

/*
function ShowSuccess (res) {
    JSDOM.fromFile(uri_login, options).then( function (dom) {
        var document = dom.window.document;
        var regtext = document.getElementById("registered");
        regtext.style.display = "block";
        res.send(document.documentElement.innerHTML);
    })
}

function ShowDup (res) {
    JSDOM.fromFile(uri_login, options).then( function (dom) {
        var document = dom.window.document;
        var regtext = document.getElementById("duplicateuser");
        regtext.style.display = "block";
        res.send(document.documentElement.innerHTML);
    })
}
*/

const DuplUser = function (res, uname) {
    return new Promise( (resolve, reject) => {
    res.locals.con.query("SELECT uname FROM users WHERE uname = ?", [uname], function (err, result) {
        if (err) {return ErrHandler(res, err);}
        if (result.length <= 0) {
            resolve();
        } else {
            reject();
        }
    })
})
}


function Register (req, res) {
        //console.log("async started");
        //console.log(req)
        var user = {
            uname: req.body.username_reg,
            passw: req.body.password_reg,
            email: req.body.email
            }
        DuplUser(res, user.uname)
        .then( async () => {
                //console.log("No Duplicate User")
                var hashedpass = await script.Hash(user.passw);
                var utoken = script.genToken(); 
                res.locals.con.query('INSERT INTO `users`(`uname`, `email`, `pass`, `token`) VALUES (?,?,?,?)', [user.uname, user.email, hashedpass, utoken], function (err, result) {
                    if (err) {return ErrHandler(res, err);}
                    //ShowSuccess(res);
                    const success = {
                        type: "reg_success", 
                        bool: true
                    }
                    //console.log("Succesfully added user:" + user.uname)
                    res.json(success)
                });

        }).catch(() => {
            //console.log("Duplicate User found");
            const dupluser = {
                type: "reg_dupluser",
                bool: true
            }
            //console.log(user.uname + "already exists")
            res.json(dupluser)
        })

};

function Login (req, res) {
    var uname = req.body.username;
    var passw = req.body.password;
    res.locals.con.query("SELECT uname, pass, token FROM users WHERE uname = ?", [uname], function (err, result) {
        if (err) {return ErrHandler(res, err);}
        //console.log(result);
        if (result.length <= 0){
            const nouser = {
                type: "login_nouser",
                bool: true
            }
            res.json(nouser);
            /*JSDOM.fromFile(uri_login, options).then( function (dom) {
                var document = dom.window.document;
                var regtext = document.getElementById("nouser");
                regtext.style.display = "block";
                res.send(document.documentElement.innerHTML);
            })*/
        } else {
        async function checkpass () {
            var checked = await script.Verify(passw, result[0].pass);
            var headers = {
                right: checked,
                user: uname,
                token: result[0].token
            }

            return headers
        }
        checkpass().then( (result) => {
            if (result.right) {
                req.session.loggedin = true;
                req.session.username = result.user;
                req.session.token = result.token;
                const login_success = {
                    type: "login_success",
                    username: result.user
                }
                res.json(login_success);
                console.log(result.user + "logged in!")
            } else {
                const login_failed = {
                    type: "login_failed", 
                    bool: true
                }
                res.json(login_failed);
                /*
                JSDOM.fromFile(uri_login, options).then( function (dom) {
                    var document = dom.window.document;
                    var regtext = document.getElementById("failed");
                    regtext.style.display = "block";
                    res.send(document.documentElement.innerHTML);
                })
                */
        }
        })
        }
    })
}







//Functions
function Home (req, res) {
    var outputs = [];
    var AllSubjs = new Promise ((resolve, reject) => {
        tables.forEach(table => {
            var totgrades = [];
            var totweight = [];
            var wg_query = res.locals.con.query("SELECT weight, grade FROM "+table + " WHERE token = ?;", [req.session.token]);
            wg_query.on('error', (res, err) => {
                return ErrHandler(res, err);
                });
            wg_query.on('result', (row) => {
                totgrades.push(row.grade);
                totweight.push(row.weight);
                });
            wg_query.on('end', () => {
                var pointsavg = script.HomeAvg(totweight, totgrades, table);
                outputs.push(pointsavg);
                if (tables.length == outputs.length) {
                    resolve("All Subject Data retrieved for Home!");
                }
                });
            });
        });
    AllSubjs.then(() => {
        const json = {
            response: outputs
        }
        console.log(json);
        res.json(json);
        /*
        var newhtmls = [];
        for (let i = 0; i < outputs.length; i++) {
            var subj = outputs[i];
            var document = dom_homerow.window.document;
            for (const val in subj) {
                var td = document.getElementById(`home_${val}1`);
                td.innerHTML = subj[val];
            }
            newhtml = document.getElementById("home_row1");
            newhtmls.push(newhtml.outerHTML);
        }
        JSDOM.fromFile(uri_home, options).then( function (dom) {
            var document = dom.window.document;
            var tBody = document.getElementsByTagName("tbody")[0];
            var fullhtml = newhtmls.join();
            tBody.innerHTML = fullhtml.replace(/,/g, "");
            var uname = document.getElementById("uname");
            uname.innerHTML = req.session.username;
            res.send(document.documentElement.innerHTML);
        })
        */
    });
}

function ShowGrades (req, res) {
    //var html_rows = [];
    let subj_row_output = [];
    var db_name = script.GetUrlValues(req.path);
    res.locals.con.query("SELECT * FROM ?? WHERE token = ?;", [db_name, req.session.token], function (err, result){
        if (err) {return ErrHandler(res, err);}
        var newHTML = new Promise ((resolve, reject) => {
            result.forEach( (result2) => {
                var trueVals = script.GetSQLValues(result2);
                subj_row_output.push(trueVals);
                //JSDOM Stuff
                /*
                var document = dom_subjrow.window.document;
                for (j = 0; j < subids.length; j++) {
                    var insertId = document.getElementById("subj" + "_" + subids[j] + "1");
                    insertId.innerHTML = trueVals[subids[j]];    
                    };
                var newhtml = document.getElementById("subj_row1").outerHTML;
                html_rows.push(newhtml);
                */
                });
            resolve("HTML Changed!");
            });
        newHTML.then( () => {
            const json_output = {
                response: subj_row_output
            }
            console.log(json_output)
            res.json(json_output)
            /*
            JSDOM.fromFile(uri_grades, options).then( function (dom) {
                //console.log(html_rows);
                var document = dom.window.document;
                var test_tbody = document.getElementById("subj_row1");
                var rawhtml = html_rows.join();
                //console.log(rawhtml);
                test_tbody.outerHTML = rawhtml.replace(/,/g, "");
                var uname = document.getElementById("uname");
                uname.innerHTML = req.session.username;
                res.send(document.documentElement.innerHTML);
            });
            */
        });
    });
}

function Calculator(req, res) {
    JSDOM.fromFile(uri_calc, options).then( function (dom) {
        var document = dom.window.document;
        var uname = document.getElementById("uname");
        uname.innerHTML = req.session.username;
        res.send(document.documentElement.innerHTML);
    })
}

function UploadGrades(req, res) {
        console.log(req.body);
        var ins = {
            date: req.body.date,
            desc: req.body.desc,
            weight: req.body.weight,
            grade: req.body.grade
        }
        //var sqlinsert = res.locals.con.escape(ins.date) + ", " + res.locals.con.escape(ins.desc) + ", " + res.locals.con.escape(ins.weight) + ", " + res.locals.con.escape(ins.grade);
        //let table_name = script.pathExtract(req.headers.referer, req.headers.origin);
        var table_name = req.body.subject
        res.locals.con.query("INSERT INTO ?? (`date`, `desc`, `weight`, `grade`, `token`) VALUES (?,?,?,?,?)", [table_name, ins.date, ins.desc, ins.weight, ins.grade, req.session.token], function (err, result) {
            if (err) {return ErrHandler(res, err);}
            const success_json = {
                type: "inserted_grade",
                bool: true,
                subject: table_name
            }
            console.log(success_json);
            res.json(success_json);
            //console.log(result);
            /*
            var referer = script.pathExtract(req.headers.referer, req.headers.origin);
            JSDOM.fromFile(uri_upload, options).then( function (dom) {
                var document = dom.window.document;
                var subj_href = document.getElementById("btn_subj");
                subj_href.href = "/" + referer;
                res.send(document.documentElement.innerHTML);
            })
            */
        })
}

function UpdateGrades(req, res) {
    console.log(req.body);
    let updarray = [req.body.table, req.body.date, req.body.desc, req.body.weight, req.body.grade, req.body.id]
    res.locals.con.query("UPDATE ?? SET date = ?, desc = ?, weight = ?, grade = ? WHERE id = ?", updarray, function (err, result) {
        if (err) {return ErrHandler(res, err)}
        const updated_json = {
            type: "updated_grade",
            bool: true
        };
        console.log(updated_json);
        res.json(updated_json);
    })
}


//Error Handling 

function ErrHandler (res, err) {
    console.error("Fuck, there was an error...\n", err);
    res.redirect("/home");
    return;
}

//-----------------------------------------//

/* Robots.txt */
app.get("/robots.txt", function (req, res) {
    res.sendFile(__dirname + "/public/assets/" + "robots.txt");
})

/* Redirect missing routes to home */
app.get("/*", function (req, res) {
    if (req.session.loggedin) {
        res.redirect("/home");
    } else {
        res.redirect("/login");
    }
})

//--------------------------------//


//Server Start
var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server started at %s:%s", host, port);
})



/*
Reset Auto-Increment:

SELECT MAX( `id` ) FROM `your_table`;

ALTER TABLE `your_table` AUTO_INCREMENT = number_from_above;


*/