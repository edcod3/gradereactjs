import React, {useState} from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { SubjName } from './utils/scripts'

export default function AddGrade(props) {

    //Include Credentials for Session Persistence
    axios.defaults.withCredentials = true

    const alert = useAlert()

    const initialgradeInp = {date: '', desc: '', weight: '', grade: ''}
    const [gradeInput, setgradeInput] = useState(initialgradeInp)

    const gradeInputVal = (name) => {
        return({target: {value} }) => {
          setgradeInput(oldVal => ({...oldVal, [name]: value}))
        }
      }

/*To-Do: 
    - Add grades to DB with nodeJS -> Done
    - NodeJS success JSON response -> Done
    - Show Message for successfull grade insertion (react-alert)
*/
    function AddGrade(event) {
        event.preventDefault();
        console.log(gradeInput);
        const req_body = {
            date: gradeInput.date,
            desc: gradeInput.desc,
            weight: gradeInput.weight,
            grade: gradeInput.grade,
            subject: props.subj

        }
        axios.post("http://localhost:8000/subj_upload", req_body, { headers: {'Content-Type': 'application/json'} })
        .then(res => {
            if (res.data.type === "inserted_grade" || res.data.bool === true) {
                //console.log(res.data);
                //const subj_path = "/" + res.data.subject
                setgradeInput(initialgradeInp)
                props.reload()
                alert.success("Note wurde erfolgreich hochgeladen!")
            } else {
                //console.log("didn't add grade. Response: " + res.data);
                alert.error("Note konnte nicht hinzugefügt werden. Versuche es nochmals!")
            }
        })
        .catch(err => console.log(err))
    }

    /*const testAlert = (type) => {
        if (type === "success") {
            alert.success("Note wurde erfolgreich hochgeladen!")
        } else if (type === "error") {
            alert.error("Note konnte nicht hinzugefügt werden. Versuche es nochmals!")
        } else {
            alert.info("That didn't work")
        }
    }*/

    return (
        <div id="wrapper_add" className="wrapper">
        <h2 id="add_grades">{SubjName(props.subj)}: Note hinzufügen</h2>
        <form onSubmit={AddGrade}>
            <table id="subj_table_add">
            <thead>
                <tr id="row_head_add">
                    <th id="th_date_add">Datum</th>
                    <th id="th_desc_add">Beschreibung</th>
                    <th id="th_weight_add">Gewicht (als Dezimalzahl)</th>
                    <th className="grade" id="th_grade_add">Note</th>
                </tr>
            </thead>
            <tbody>
                <tr id="subj_row1_add">
                    <td><input type="date" value={gradeInput.date} onChange={gradeInputVal("date")} required/></td>
                    <td><input type="text" value={gradeInput.desc} onChange={gradeInputVal("desc")} required/></td>
                    <td><input type="number" min="0" max="1" step="0.01" value={gradeInput.weight} onChange={gradeInputVal("weight")} required/></td>
                    <td className="grade"><input type="number" min="0" max="6" step="0.05" value={gradeInput.grade} onChange={gradeInputVal("grade")} required/></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="4"><button value="Note hinzufügen" className="grade_btn" type="submit"><span>Note hinzufügen</span></button></td>
                </tr>
            </tfoot>
            </table>
        </form>
    </div>
    )
}