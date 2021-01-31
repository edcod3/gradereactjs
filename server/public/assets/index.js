function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function CapAllSubjs (allsubjs) {
    var allsubjs = document.querySelectorAll("#home_row1");
    allsubjs.forEach(subj => {
        var subjname = subj.querySelector("#home_subject1");
        var rawname = subjname.innerHTML;
        var newname = capitalize(rawname);
        if (rawname.includes("_")) {
            var spacename = rawname.replace("_", " ");
            var truename = spacename.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
            subjname.innerHTML = truename;
        } else {
            subjname.innerHTML = newname;
        }
    })
}

function CheckNan () {
    var totavg = document.getElementById("home_avg");
    if (totavg.innerHTML == "NaN") {
        totavg.innerHTML = "Kein Durchschnitt";
    }
}

function FilterNaN (allsubjs) {
    var allsubjs = document.querySelectorAll("#home_row1");
    allsubjs.forEach(subj => {
        var points = subj.querySelector("#home_points1");
        var grade = subj.querySelector("#home_grade1");
        if (points.innerHTML == "NaN") {
            points.innerHTML = "0";
            grade.innerHTML = "Keine Noten gefunden!";
        }
    })
}

function CalcTotalPoints () {
    var allsubjs = document.querySelectorAll("#home_points1");
    var allpoints = [];
    allsubjs.forEach(subj => {allpoints.push(Number(subj.innerHTML))});
    var sumpoints = allpoints.reduce(function(a, b){
        return a + b;
    }, 0);
    var pointsTd = document.getElementById("home_points");
    pointsTd.innerHTML = sumpoints;
}

function CalcTotalAvg () {
    var allsubjs = document.querySelectorAll("#home_grade1");
    var allgrades = [];
    allsubjs.forEach(subj => {
        if (subj.innerHTML != "Keine Noten gefunden!") {
            allgrades.push(Number(subj.innerHTML));
        }
    });
    var sumgrade = allgrades.reduce(function(a, b){
        return a + b;
    }, 0);
    var avgavg = sumgrade / allgrades.length;
    var roundedavg = Math.round(avgavg*2)/2
    var pointsTd = document.getElementById("home_avg");
    pointsTd.innerHTML = roundedavg;
}

function HyperLinkSubj () {
    const tables = new Array("/app_development","/economics","/english","/finances","/french","/german","/history","/mathematics","/sports","/system_technology");
    //const subjhtml = ["App Entwicklung", "Wirtschaft/Recht", "Englisch", "Finanz-/Rechnungswesen", "Französisch", "Deutsch", "Geschichte", "Mathematik", "Sport", "Systemtechnik"];
    //var subjs = document.querySelectorAll("#home_subject1");
    var rows = document.querySelectorAll("#home_row1");
    for (let i=0; i<rows.length; i++) {
        rows[i].addEventListener("click", function () {
            window.location.href = tables[i];
        }, false)
    }
}

/* Onload Function */

function HomeStart () {
    CapAllSubjs();
    FilterNaN(); 
    CalcTotalPoints();
    CalcTotalAvg();
    CheckNan();
    HyperLinkSubj();
}

window.onload = HomeStart();