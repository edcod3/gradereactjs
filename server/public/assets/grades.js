function JScap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function GetUrlQuery () {
    var id_name = window.location.pathname.substring(1);
    var html_name = id_name;
    return {
        IdName: id_name,
        CapName: html_name,
    };
}


function OutputSubj(rawsubj) {
    const tables = new Array("app_development","economics","english","finances","french","german","history","mathematics","sports","system_technology");
    const captables = new Array("App_development","Economics","English","Finances","French","German","History","Mathematics","Sports","System_technology");
    const germtables = new Array("App Entwicklung", "Wirtschaft/Recht", "Englisch", "Finanz-/Rechnungswesen", "Französisch", "Deutsch", "Geschichte", "Mathematik", "Sport", "Systemtechnik");
    var EngGradesH2 = document.getElementById("your_grades");
    var EngAddGradesH2 = document.getElementById("add_grades");
    var EAGH2_html = EngAddGradesH2.innerHTML;
    var EGH2_html = EngGradesH2.innerHTML;
    for (let i = 0; i < tables.length; i++) {
        if (rawsubj == tables[i]) {
            //console.log("Found result at: " + tables[i] + " Translation: " + germtables[i]);
            var EGH2_newhtml = EGH2_html.replace(captables[i], germtables[i]);
            EngGradesH2.innerHTML = EGH2_newhtml;
            var EAGH2_newhtml = EAGH2_html.replace(captables[i], germtables[i]);
            EngAddGradesH2.innerHTML = EAGH2_newhtml;
            //console.log(EAGH2_html);
            //console.log(EGH2_html);
        } else {
            continue
        }
    }
}


function RenameIds (newId) {
    var allIds = document.querySelectorAll('*[id^="subj"]');
    //console.log(newId);
    allIds.forEach( function (oldElem) {
        //oldElem = document.getElementById(oldId);
        var oldId = oldElem.id;
        var fullnewId = oldId.replace("subj", newId);
        //oldElem.id = newId;
        var Elem = document.getElementById(oldId);
        Elem.id = fullnewId;
    })
}

function RenameHTML (newHTML) {
    var YourGradesH2 = document.getElementById("your_grades");
    var AddGradesH2 = document.getElementById("add_grades");
    var YGH2_html = YourGradesH2.innerHTML;
    var truehtml = newHTML.charAt(0).toUpperCase() + newHTML.slice(1)
    var YGH2_newhtml = YGH2_html.replace("Subject", truehtml);
    YourGradesH2.innerHTML = YGH2_newhtml;
    var AGH2_html = AddGradesH2.innerHTML;
    var AGH2_newhtml = AGH2_html.replace("Subject", truehtml);
    AddGradesH2.innerHTML = AGH2_newhtml;
}

/* Average Calculator */

function ShowAvg (avgGrade) {
    var avgTd = document.getElementById("grade_avg");
    avgTd.innerHTML = avgGrade;
    if (avgGrade < 3.75) {
        avgTd.className = "ungenügend";
    } 
}

function CalcPoints(val) {
    var roundedGrade =  Math.round(val*2)/2;
    if (roundedGrade >= 4) {
        var TrueRoundedGrade = roundedGrade % 4; 
    } else if (roundedGrade >= 3) {
        var TrueRoundedGrade = roundedGrade % 3 - 1;
    } else if (roundedGrade >= 2) {
        var TrueRoundedGrade = roundedGrade % 1 - 2;
    } else if (roundedGrade >= 1) {
        var TrueRoundedGrade = roundedGrade % 1 - 3;
    }
    return TrueRoundedGrade;
}

function ShowPoints (avgGrade) {
    var points = CalcPoints(avgGrade);
    var pointsTr = document.getElementById("grade_points");
    pointsTr.innerHTML = points;
    if (avgGrade < 3.75) {
        pointsTr.className = "ungenügend";
    } 
}

function GetAvg(listValues) {
    var gradeSum = listValues.reduce(function(a, b){
            return a + b;
        }, 0);
    var gradeAvg = gradeSum / listValues.length;
    var roundedAvg = gradeAvg.toFixed(2);
    return roundedAvg;
}

function GetValuesFromIds(listIds) {
    var listValues = [];
    for (var i = 1, len = listIds.length; i < len; i++) {
        //console.log(listIds);
        //console.log(listIds[i].innerHTML);
        var SingleValue = parseFloat(listIds[i].innerHTML);
        listValues.push(SingleValue);
    };
    //console.log(listValues);
    return listValues;
}

function Filterweight(weightValues) {
    var weightFiltered = [];
    for (var i = 0, len=weightValues.length; i < len; i++) {
        if (Number.isNaN(weightValues[i])) {
            weightFiltered.push(1);
        } else {
            weightFiltered.push(weightValues[i]);
        }
    };
    //console.log(weightFiltered);
    return weightFiltered;
}

function CheckNaNUndefined () {
    var totavg = document.getElementById("grade_avg");
    var gradepnt = document.getElementById("grade_points");
    if (totavg.innerHTML == "NaN") {
        totavg.innerHTML = "Kein Durchschnitt";
    } 
    if (gradepnt.innerHTML == "undefined") {
        gradepnt.innerHTML = "0";
    }
}

function CalculateweightGrade(weightFiltered, gradeValues) {
    var CalculatedGrades = [];
    var ToCalcGrades = [];
    var ToCalcweights = [];
    var weightedGrades = [];
    for (var i = 0; i < Math.min(weightFiltered.length, gradeValues.length); i++) {
        if (weightFiltered[i] === 1) {
        CalculatedGrades.push(gradeValues[i]);
        } else if (weightFiltered[i] < 1) {
            ToCalcGrades.push(gradeValues[i]);
            ToCalcweights.push(weightFiltered[i]);
        }
    }
    if (ToCalcGrades.length >= 1) {
        for (var i = 0; i < Math.min(ToCalcGrades.length, ToCalcweights.length); i++) {
            var weightedGrade = ToCalcGrades[i] * ToCalcweights[i];
            weightedGrades.push(weightedGrade);
        }
        var WeightedGradeSum = weightedGrades.reduce(function(a, b){
                return a + b;
            }, 0);
        if (WeightedGradeSum <= 6) {
            CalculatedGrades.push(WeightedGradeSum);
        } else if (WeightedGradeSum <= 12) {
            var halfWeightedGradeSum = WeightedGradeSum / 2;
            CalculatedGrades.push(halfWeightedGradeSum);
            CalculatedGrades.push(halfWeightedGradeSum);
        } else if (WeightedGradeSum <= 18) {
            var thirdsWeightedGradeSum = WeightedGradeSum / 3;
            CalculatedGrades.push(thirdsWeightedGradeSum);
            CalculatedGrades.push(thirdsWeightedGradeSum);
            CalculatedGrades.push(thirdsWeightedGradeSum);
        } else {
            console.log("What the actual fuck?!?")
        }
    }
    //console.log(CalculatedGrades);
    return CalculatedGrades;
}
/* ------------------------------------ */


function RenameSite () {
    var path = GetUrlQuery();
    RenameIds(path.IdName);
    RenameHTML(path.CapName);
    OutputSubj(path.CapName);
}

function GetGradeAvg () {
    var gradeClass = document.getElementsByClassName("grade");
    var weightClass = document.getElementsByClassName("weight");
    var weightValues = GetValuesFromIds(weightClass);
    var gradeValues = GetValuesFromIds(gradeClass);
    var filteredWeight = Filterweight(weightValues);
    var gradeCalculatedValues = CalculateweightGrade(filteredWeight, gradeValues);
    var AvgGrade = GetAvg(gradeCalculatedValues);
    ShowAvg(AvgGrade);
    ShowPoints(AvgGrade);
}

function OnLoadFunc () {
    RenameSite();
    GetGradeAvg();
    CheckNaNUndefined();
}

window.onload = OnLoadFunc();

//Home Function
function HomeAvg (weight, grades, subj) {
    var gradeCalculatedValues = CalculateweightGrade(weight, grades);
    var AvgGrade = GetAvg(gradeCalculatedValues);
    var SubjPoints = CalcPoints(AvgGrade);
    var AvgObj = {
        subject: subj,
        grade: AvgGrade,
        points: SubjPoints
    };
    return AvgObj
}

