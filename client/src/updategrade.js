import React, {useState} from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { FormatDate } from './utils/scripts'

export default function UpdateGrade(props) {

    const alert = useAlert()

    //Enable express-session persistence
    axios.defaults.withCredentials = true;

    const [updateVal, setupdateVal] = useState({date: FormatDate(props.row.date), desc: props.row.desc, weight: props.row.weight, grade: props.row.grade, id: props.row.id, table: props.table})

    const gradeUpdateVal = (name) => {
        return({target: {value} }) => {
          setupdateVal(oldVal => ({...oldVal, [name]: value}))
        }
    }


    /*
    To-Do: 
        - Test Grade Update -> Done
        - Debug (if necessary) -> Done
        - reload Subject Grades on successful update -> Done
    */
     
    function handleUpdate() {
        console.log(updateVal)
        console.log(props.table)
        axios.post('http://localhost:8000/subj_update', updateVal, {headers: {'Content-Type': 'application/json'}})
            .then(res => {
                console.log(res.data)
                if (res.data.type === "updated_grade" && res.data.bool === true) {
                    props.close()
                    alert.success("Eintrag wurde erfolgreich aktualisiert!")
                } else {
                    alert.error("Eintrag konnte nicht aktualisiert werden. Versuche es nochmals!")
                }
            })
            .catch(err => console.log(err))
        //props.close();
    }

    return (
        <tr id="subj_row1_update">
            <td><button onClick={() => handleUpdate()}>Eintrag aktualisieren</button></td>
            <td><input type="date" value={updateVal.date} onChange={gradeUpdateVal("date")} required/></td>
            <td><input type="text" value={updateVal.desc} onChange={gradeUpdateVal("desc")} required/></td>
            <td><input type="number" min="0" max="1" step="0.01" value={updateVal.weight} onChange={gradeUpdateVal("weight")} required/></td>
            <td className="grade"><input type="number" min="0" max="6" step="0.05" value={updateVal.grade} onChange={gradeUpdateVal("grade")} required/></td>
        </tr>
    )
}
