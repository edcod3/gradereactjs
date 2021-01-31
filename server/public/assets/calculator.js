function NewRowIDs(newRowID) {
    //var getRow = document.getElementById(newRowID);
    var RowNumber = Number(newRowID.replace(/[^0-9]/g, '')) -1;
    var newRowNumber = RowNumber + 1;
    const ids_word = ["subject", "desc", "weight", "grade"];
    for (var i = 0, len = ids_word.length; i < len; i++) {
    //ids_word.forEach(function (item) {
        var ElemId = ids_word[i] + RowNumber;
        //console.log(ElemId);
        var newElemID = ids_word[i] + newRowNumber;
        //console.log(newElemID);
        var getElemId = document.querySelectorAll("#" + ElemId)[1];
        getElemId.id = newElemID;
    };
}
function RowAdd() {
    var getTable = document.getElementById("inputTable");
    var getTableBody = document.getElementById('TableBody');
    var RowLast = getTable.rows.length-2;
    var RowLastID = "row" + RowLast;
    var GetRowLast = document.getElementById(RowLastID);
    var cloneRow = GetRowLast.cloneNode(true);
    var nextRowID = "row" + (RowLast + 1);
    cloneRow.id = nextRowID;
    getTableBody.appendChild(cloneRow);
    NewRowIDs(nextRowID);
}

function GetAvg(listValues) {
    var gradeSum = listValues.reduce(function(a, b){
            return a + b;
        }, 0);
    var gradeAvg = gradeSum / listValues.length;
    return gradeAvg;
}

function ShowAvg(showValue) {
    var ShowavgTd = document.getElementById('calc_avg_grade');
    ShowavgTd.innerHTML = showValue.toString();
    var showtfoot = document.getElementById("average_tfoot");
    showtfoot.style.display = "table-footer-group";
}


function GetValuesFromIds(listIds) {
    var listValues = [];
    for (var i = 0, len = listIds.length; i < len; i++) {
        var SingleValue = parseFloat(listIds[i].value);
        listValues.push(SingleValue);
    };
    //console.log(listValues);
    return listValues;
}

function Filterweight(weightValues) {
    weightFiltered = [];
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

function CalculateweightGrade(weightFiltered, gradeValues) {
    CalculatedGrades = [];
    ToCalcGrades = [];
    ToCalcweights = [];
    weightedGrades = [];
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

function calculator_adv () {
    var gradeIds = document.querySelectorAll('*[id^="grade"]');
    var weightIds = document.querySelectorAll('*[id^="weight"]');
    var weightValues = GetValuesFromIds(weightIds);
    var gradeValues = GetValuesFromIds(gradeIds);
    var filteredWeight = Filterweight(weightValues);
    var gradeCalculatedValues = CalculateweightGrade(filteredWeight, gradeValues);
    var AvgGrade = GetAvg(gradeCalculatedValues);
    ShowAvg(AvgGrade);
}


// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("topnav");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;


// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
} 




/* --------------------------- Basic Concept ----------------- */
/*       Basic Claculator
        function calculator_basic() {
            var grade1 = parseFloat(document.getElementById('grade1').value);
            var grade2 = parseFloat(document.getElementById('grade2').value);
            //var grade2 = parseFloat(document.getElementById('grade2').value*0.25);
            //var grade3 = parseFloat(document.getElementById('grade3').value*0.25);
            var grade_list = [grade1, grade2];//+grade2+grade3;
            var grade_llength = grade_list.length;    
            var gl_sum = grade_list.reduce(function(a, b){
                    return a + b;
                }, 0);
            var grade_final = gl_sum / grade_llength;
            
            
            var display = document.getElementById('avgDiv');
            display.innerHTML='Your average grade is: ' + grade_final;
            
        }
*/
   