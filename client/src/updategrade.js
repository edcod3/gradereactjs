import React, {useState} from 'react'
import { FormatDate } from './utils/scripts'

export default function UpdateGrade(props) {

    const [updateVal, setupdateVal] = useState({date: FormatDate(props.row.date), desc: props.row.desc, weight: props.row.weight, grade: props.row.grade})

    const gradeUpdateVal = (name) => {
        return({target: {value} }) => {
          setupdateVal(oldVal => ({...oldVal, [name]: value}))
        }
    }

    function handleUpdate() {
        console.log(updateVal)
        //props.close();
    }

    return (
        <tr id="subj_row1_update">
            <td><button onClick={() => handleUpdate()}>Eintrag aktualisieren</button></td>
            <td><input type="date" value={updateVal.date} onChange={gradeUpdateVal("date")} required/></td>
            <td><input type="text" value={updateVal.desc} onChange={gradeUpdateVal("desc")} required/></td>
            <td><input type="number" min="0" max="1" step="0.01" value={updateVal.weight} onChange={gradeUpdateVal("weight")} required/></td>
            <td class="grade"><input type="number" min="0" max="6" step="0.05" value={updateVal.grade} onChange={gradeUpdateVal("grade")} required/></td>
        </tr>
    )
}
