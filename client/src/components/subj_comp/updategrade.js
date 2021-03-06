import React, { useState } from "react"
import axios from "axios"
import { useAlert } from "react-alert"
import { FormatDate, SessionLogout, setInput } from "../../utils/scripts"
import { GetApiUrl } from "../../utils/apiurl"

export default function UpdateGrade(props) {
	const alert = useAlert()

	//Enable express-session persistence
	axios.defaults.withCredentials = true

	//Update Row State (initial Values from row)
	const [updateVal, setupdateVal] = useState({
		date: FormatDate(props.row.date),
		desc: props.row.desc,
		weight: props.row.weight,
		grade: props.row.grade,
		id: props.row.id,
		table: props.table
	})

	function handleUpdate() {
		//console.log(updateVal)
		//console.log(props.table)
		axios
			.post(`${GetApiUrl()}/subj_update`, updateVal, {
				headers: { "Content-Type": "application/json" }
			})
			.then((res) => {
				//console.log(res.data)
				if (
					res.data.type === "updated_grade" &&
					res.data.bool === true
				) {
					props.close()
					const succ_msg =
						window.innerWidth <= 600
							? "Eintrag aktualisiert!"
							: "Eintrag wurde erfolgreich aktualisiert!"
					alert.success(succ_msg)
				} else {
					const err_msg =
						window.innerWidth <= 600
							? "Aktualisierung fehlgeschlagen!"
							: "Eintrag konnte nicht aktualisiert werden. Versuche es nochmals!"
					alert.error(err_msg)
				}
			})
			.catch((err) => SessionLogout(err))
		//props.close();
	}

	return (
		<tr id="subj_row1_update" className="update_row">
			<td>
				<button onClick={() => handleUpdate()} className="update_btn">
					{window.innerWidth <= 400
						? "Einfügen"
						: "Eintrag aktualisieren"}
				</button>
			</td>
			<td>
				<input
					type="date"
					className="subj_date"
					name="date"
					value={updateVal.date}
					onChange={(evnt) => setInput(setupdateVal, evnt)}
					required
				/>
			</td>
			<td>
				<input
					type="text"
					value={updateVal.desc}
					name="desc"
					onChange={(evnt) => setInput(setupdateVal, evnt)}
					required
				/>
			</td>
			<td>
				<input
					type="number"
					min="0"
					max="1"
					step="0.01"
					name="weight"
					value={updateVal.weight}
					onChange={(evnt) => setInput(setupdateVal, evnt)}
					required
				/>
			</td>
			<td className="grade">
				<input
					type="number"
					min="0"
					max="6"
					step="0.05"
					name="grade"
					value={updateVal.grade}
					onChange={(evnt) => setInput(setupdateVal, evnt)}
					required
				/>
			</td>
		</tr>
	)
}
