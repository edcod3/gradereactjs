import React, { useState, useEffect } from "react"
import axios from "axios"
import { ReverseSubjName, SessionLogout } from "../utils/scripts"
import { GetApiUrl } from "../utils/apiurl"

export default function Home(props) {
	//Enable express-session persistence
	axios.defaults.withCredentials = true

	//Average, Points State
	const [AvgPoints, setAvgPoints] = useState({ avg: 0, points: 0 })
	const [gradeVals, setgradeVals] = useState([])

	//Get Average Grade based on grade array
	const GetAvg = (array) => {
		const avg_sum = array.reduce((a, b) => a + b)
		const avg = avg_sum / array.length
		return avg
	}

	//Get all grades & points from NodeJS API
	useEffect(() => {
		axios
			.get(`${GetApiUrl()}/home`, {
				headers: { "Content-Type": "application/json" }
			})
			.then((res) => {
				let grade_arr = res.data.response
				let grades = grade_arr
					.filter((subj) => subj.grade !== "NaN")
					.map((subj) => parseFloat(subj.grade))
				let points_arr = grade_arr
					.filter((subj) => subj.points !== null)
					.map((subj) => subj.points)
				if (points_arr.length >= 1) {
					let totpoints = points_arr.reduce((a, b) => a + b)
					let avg = GetAvg(grades)
					setAvgPoints({ avg: avg, points: totpoints })
					setgradeVals(grade_arr)
				} else {
					let totpoints = "Keine Punkte"
					let avg = grades.length >= 1 ? GetAvg(grades) : 0
					setAvgPoints({ avg: avg, points: totpoints })
					setgradeVals(grade_arr)
				}
			})
			.catch((err) => SessionLogout(err))
	}, [])

	return (
		<div id="wrapper_home" className="wrapper">
			<h2 id="home_grades">Notenübersicht</h2>
			<table id="subj_table">
				<thead>
					<tr id="row_head">
						<th id="th_subj">Fach</th>
						<th className="grade" id="th_grade">
							Durchschnittsnote
						</th>
						<th id="th_points" className="weight">
							Punkte
						</th>
					</tr>
				</thead>
				<tbody>
					{gradeVals.map((subj, i) => {
						return (
							<tr
								key={"home_row" + i}
								onClick={() =>
									props.redirect(
										`/${ReverseSubjName(subj.subject)}`
									)
								}>
								<td key={"home_subject" + i}>
									{window.innerWidth <= 430
										? subj.subject.replace("/", " / ")
										: subj.subject}
								</td>
								<td className="grade" key={"home_grade" + i}>
									{subj.grade !== "NaN"
										? subj.grade
										: "Keine Noten gefunden!"}
								</td>
								<td className="weight" key={"home_points" + i}>
									{!subj.points ? "0" : subj.points}
								</td>
							</tr>
						)
					})}
				</tbody>
				<tfoot>
					<tr className="home_row_foot">
						<td className="none"></td>
						<td
							id="desc_points"
							className="td_points_desc"
							colSpan="1">
							Gesamtpunkte:
						</td>
						<td id="home_points" className="td_points">
							{AvgPoints.points}
						</td>
					</tr>
					<tr className="home_row_foot">
						<td className="none"></td>
						<td id="desc_avg" className="td_avg_desc" colSpan="1">
							Gesamtdurchschnitt:
						</td>
						<td id="home_avg" className="td_avg">
							{Math.round(AvgPoints.avg) === 0
								? "Kein Durchschnitt"
								: AvgPoints.avg.toFixed(2)}
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	)
}

/*
            <tr id="home_row1">
                <td id="home_subject1">Error</td>
                <td className="grade" id="home_grade1">Keine Noten gefunden</td>
                <td id="home_points1" className="weight">0</td>
            </tr>
*/
