//Calculate points based on grade
function CalcPoints(val) {
	var roundedGrade = Math.round(val * 2) / 2
	if (roundedGrade >= 4) {
		var TrueRoundedGrade = roundedGrade % 4
	} else if (roundedGrade >= 3) {
		TrueRoundedGrade = (roundedGrade % 3) - 1
	} else if (roundedGrade >= 2) {
		TrueRoundedGrade = (roundedGrade % 1) - 2
	} else if (roundedGrade >= 1) {
		TrueRoundedGrade = (roundedGrade % 1) - 3
	}
	//console.log(TrueRoundedGrade)
	return TrueRoundedGrade
}

//Calculate weighted grade with an amazing formula
// Sum of weighted Grades / Sum of weights = avg
function CalculateweightedGrades2(weightFiltered, gradeValues) {
	var weightedGrades = []
	for (
		let i = 0;
		i < Math.min(gradeValues.length, weightFiltered.length);
		i++
	) {
		let weightedGrade = gradeValues[i] * weightFiltered[i]
		weightedGrades.push(weightedGrade)
	}
	if (weightedGrades.length >= 1) {
		let WeightedGradeSum = weightedGrades.reduce((a, b) => a + b)
		let weight_sum = weightFiltered.reduce((a, b) => a + b)
		const avg = WeightedGradeSum / weight_sum
		return avg
	} else {
		return "NaN"
	}
}

//exported function to calculate average grade and points
export default function CalcGradeAvg(weights, grades) {
	let AvgGrade = CalculateweightedGrades2(weights, grades)
	let points = CalcPoints(AvgGrade)
	return [AvgGrade, points]
}
