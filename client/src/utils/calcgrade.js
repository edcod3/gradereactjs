function CalcPoints(val) {
    var roundedGrade =  Math.round(val*2) / 2;
    if (roundedGrade >= 4) {
        var TrueRoundedGrade = roundedGrade % 4; 
    } else if (roundedGrade >= 3) {
        TrueRoundedGrade = roundedGrade % 3 - 1;
    } else if (roundedGrade >= 2) {
        TrueRoundedGrade = roundedGrade % 1 - 2;
    } else if (roundedGrade >= 1) {
        TrueRoundedGrade = roundedGrade % 1 - 3;
    }
    //console.log(TrueRoundedGrade)
    return TrueRoundedGrade;
}

/*
function GetAvg(listValues) {
    var gradeSum = listValues.reduce(function(a, b){
            return a + b;
        }, 0);
    var gradeAvg = gradeSum / listValues.length;
    var roundedAvg = gradeAvg.toFixed(2);
    return roundedAvg;
}


function CalculateweightedGrades(weightFiltered, gradeValues) {
    var CalculatedGrades = [];
    var ToCalcGrades = [];
    var ToCalcweights = [];
    var weightedGrades = [];
    for (let i = 0; i < Math.min(weightFiltered.length, gradeValues.length); i++) {
        if (weightFiltered[i] === 1) {
        CalculatedGrades.push(gradeValues[i]);
        } else if (weightFiltered[i] < 1) {
            ToCalcGrades.push(gradeValues[i]);
            ToCalcweights.push(weightFiltered[i]);
        }
    }
    if (ToCalcGrades.length >= 1) {
        for (let i = 0; i < Math.min(ToCalcGrades.length, ToCalcweights.length); i++) {
            var weightedGrade = ToCalcGrades[i] * ToCalcweights[i];
            weightedGrades.push(weightedGrade);
        }
        var WeightedGradeSum = weightedGrades.reduce((a, b) => a+b)
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
*/

function CalculateweightedGrades2(weightFiltered, gradeValues) {
    var weightedGrades = [];
    for (let i = 0; i < Math.min(gradeValues.length, weightFiltered.length); i++) {
        let weightedGrade = gradeValues[i] * weightFiltered[i];
        weightedGrades.push(weightedGrade);
    }
    if (weightedGrades.length >= 1) {
        let WeightedGradeSum = weightedGrades.reduce((a, b) => a+b)
        let weight_sum = weightFiltered.reduce((a,b) => a+b)
        const avg = WeightedGradeSum / weight_sum
        return avg;
    } else {
        return "NaN"
    }
}

export default function CalcGradeAvg (weights, grades) {
    let AvgGrade = CalculateweightedGrades2(weights, grades)
    let points = CalcPoints(AvgGrade)
    return [AvgGrade, points]
}