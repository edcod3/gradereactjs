import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import { SubjName } from './utils/scripts'

export default function AddGrade(props) {

    //Include Credentials for Session Persistence
    axios.defaults.withCredentials = true

    const [gradeInput, setgradeInput] = useState({date: '', desc: '', weight: '', grade: ''})

    const gradeInputVal = (name) => {
        return({target: {value} }) => {
          setgradeInput(oldVal => ({...oldVal, [name]: value}))
        }
      }

/*To-Do: 
    - Add grades to DB with nodeJS
    - NodeJS success JSON response
    - Show Message for successfull grade insertion
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
                console.log(res.data);
                const subj_path = "/" + res.data.subject
                return <Redirect to={{pathname: "/uploaded", state: {subject: subj_path}}} />
            } else {
                console.log("didn't add grade. Response: " + res.data);
                alert("Note konnte nicht hinzugefügt werden. Versuche es nochmals!")
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div id="wrapper_add" class="wrapper">
        <h2 id="add_grades">{SubjName(props.subj)}: Note hinzufügen</h2>
        <form onSubmit={AddGrade}>
            <table id="subj_table_add">
            <thead>
                <tr id="row_head_add">
                    <th id="th_date_add">Datum</th>
                    <th id="th_desc_add">Beschreibung</th>
                    <th id="th_weight_add">Gewicht (als Dezimalzahl)</th>
                    <th class="grade" id="th_grade_add">Note</th>
                </tr>
            </thead>
            <tbody>
                <tr id="subj_row1_add">
                    <td><input type="date" value={gradeInput.date} onChange={gradeInputVal("date")} /></td>
                    <td><input type="text" value={gradeInput.desc} onChange={gradeInputVal("desc")} /></td>
                    <td><input type="number" min="0" max="1" step="0.01" value={gradeInput.weight} onChange={gradeInputVal("weight")}/></td>
                    <td class="grade"><input type="number" min="0" max="6" step="0.05" value={gradeInput.grade} onChange={gradeInputVal("grade")}/></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4"><button value="Note hinzufügen" class="grade_btn" type="submit"><span>Note hinzufügen</span></button></td>
                </tr>
            </tfoot>
            </table>
        </form>
    </div>
    )
}
