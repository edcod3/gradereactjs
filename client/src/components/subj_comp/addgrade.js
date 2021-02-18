import React, { useState } from "react"
import axios from "axios"
import { useAlert } from "react-alert"
import { SubjName, SessionLogout, setInput } from "../../utils/scripts"
import { GetApiUrl } from "../../utils/apiurl"

export default function AddGrade(props) {
	//Include Credentials for Session Persistence
	axios.defaults.withCredentials = true

	//Use react-alert
	const alert = useAlert()

	//Grade Input State
	const initialgradeInp = { date: "", desc: "", weight: "", grade: "" }
	const [gradeInput, setgradeInput] = useState(initialgradeInp)

	function AddGrade(event) {
		event.preventDefault()
		//console.log(gradeInput)
		const req_body = {
			date: gradeInput.date,
			desc: gradeInput.desc,
			weight: gradeInput.weight,
			grade: gradeInput.grade,
			subject: props.subj
		}
		axios
			.post(`${GetApiUrl()}/subj_upload`, req_body, {
				headers: { "Content-Type": "application/json" }
			})
			.then((res) => {
				if (
					res.data.type === "inserted_grade" ||
					res.data.bool === true
				) {
					//console.log(res.data);
					//const subj_path = "/" + res.data.subject
					setgradeInput(initialgradeInp)
					props.reload()
					const succ_msg =
						window.innerWidth <= 500
							? "Note hochgeladen!"
							: "Note wurde erfolgreich hochgeladen!"
					alert.success(succ_msg)
				} else {
					//console.log("didn't add grade. Response: " + res.data);
					const err_msg =
						window.innerWidth <= 500
							? "Note nicht hinzugefügt!"
							: "Note konnte nicht hinzugefügt werden. Versuche es nochmals!"
					alert.error(err_msg)
				}
			})
			.catch((err) => SessionLogout(err))
	}

	return (
		<div id="wrapper_add" className="wrapper">
			<h2 id="add_grades">{SubjName(props.subj)}: Note hinzufügen</h2>
			<form onSubmit={AddGrade}>
				<table id="subj_table_add">
					<thead>
						<tr id="row_head_add">
							<th id="th_date_add">Datum</th>
							<th id="th_desc_add">Beschreibung</th>
							<th id="th_weight_add">
								{window.innerWidth <= 365
									? "Gewicht"
									: "Gewicht (als Dezimalzahl)"}
							</th>
							<th className="grade" id="th_grade_add">
								Note
							</th>
						</tr>
					</thead>
					<tbody>
						<tr id="subj_row1_add">
							<td>
								<input
									type="date"
									name="date"
									value={gradeInput.date}
									onChange={(evnt) =>
										setInput(setgradeInput, evnt)
									}
									required
								/>
							</td>
							<td>
								<input
									type="text"
									name="desc"
									value={gradeInput.desc}
									onChange={(evnt) =>
										setInput(setgradeInput, evnt)
									}
									required
								/>
							</td>
							<td>
								<input
									type="number"
									name="weight"
									min="0"
									max="1"
									step="0.01"
									value={gradeInput.weight}
									onChange={(evnt) =>
										setInput(setgradeInput, evnt)
									}
									required
								/>
							</td>
							<td className="grade">
								<input
									type="number"
									name="grade"
									min="0"
									max="6"
									step="0.05"
									value={gradeInput.grade}
									onChange={(evnt) =>
										setInput(setgradeInput, evnt)
									}
									required
								/>
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td colSpan="4">
								<button
									value="Note hinzufügen"
									className="grade_btn"
									type="submit">
									<span>Note hinzufügen</span>
								</button>
							</td>
						</tr>
					</tfoot>
				</table>
			</form>
		</div>
	)
}
