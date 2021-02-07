import React, {useState, useEffect} from 'react'
import axios from 'axios' 
import { useAlert } from 'react-alert'
import { confirmAlert } from 'react-confirm-alert'
import CalcGradeAvg from './utils/calcgrade'
import { SubjName, SessionLogout } from './utils/scripts'
import AddGrade from './addgrade'
import UpdateGrade from './updategrade'
//Import react-confirm-alert CSS
import './assets/react-confirm-alert.css';

export default function Subject(props) {

    const [updateRow, setupdateRow] = useState()
    const [reload, setReload] = useState(false)
    const [AvgPoints, setAvgPoints] = useState({avg: 0, points: 0})
    const [subjData, setsubjData] = useState([])

    const today = new Date();
    
    const alert = useAlert();

    //Enable express-session persistence
    axios.defaults.withCredentials = true;
    const subj_url = 'http://localhost:8000/' + props.subj;

    function GetAvg(array) {
        const grades = array.map((row) => parseFloat(row.grade))
        const weights = array.map((row) => parseFloat(row.weight))
        const [avg, points] = CalcGradeAvg(weights, grades)
        console.log(points)
        setAvgPoints({avg: avg, points: points})
    }

    const ReloadPage = () => {
        setReload(!reload)
    }

    const CloseUpdate = () => {
        setupdateRow()
        setReload(!reload)
    }

    useEffect(() => {
        setsubjData([])
        setAvgPoints({avg: 0, points: 0})
        //console.log(subj_url)
        axios.get(subj_url, {headers: {'Content-Type': 'application/json'}})
            .then(res => {
                //console.log(res.data.response)
                GetAvg(res.data.response)
                setsubjData(res.data.response)
            })
            .catch(err => SessionLogout(err))
    }, [subj_url, reload])

    function deleteRow(row_index) {
        axios.post("http://localhost:8000/subj_delete", {index: row_index, table: props.subj}, {headers: {'Content-Type': 'application/json'}})
        .then(res => {
            if (res.data.type === "deleted_grade" && res.data.bool === true) {
                //console.log(res.data);
                ReloadPage()
                alert.success("Note wurde erfolgreich gelöscht!")
            } else {
                //console.log("didn't add grade. Response: " + res.data);
                alert.error("Note konnte nicht gelöscht werden. Versuche es nochmals!")
            }
        })
        .catch(err => SessionLogout(err))
    }

    function confirmDelete(index, rowid) {
        confirmAlert({
            title: 'Sollte diese Note gelöscht werden?',
            message:  `Note: ${subjData[index].grade} (${subjData[index].desc})`,
            buttons: [
              {
                label: 'Ja',
                onClick: () => deleteRow(rowid)
              },
              {
                label: 'Nein'
              }
            ]
        })
    }

    return (
        <div>
            <div id="wrapper_show" className="wrapper">
                <h2 id="your_grades">{SubjName(props.subj)}: Deine Noten</h2>
                <table id="subj_table">
                <thead>
                <tr id="row_head">
                    <th id="th_edit">{(window.innerWidth <= 400) ? "Editiere Eintrag" : "Eintrag editieren"}</th>
                    <th id="th_date">Datum</th>
                    <th id="th_desc">{(window.innerWidth <= 400) ? "Bemerkung" : "Beschreibung"}</th>
                    <th id="th_weight" className="weight">Gewicht</th>
                    <th className="grade" id="th_grade">Note</th>
                </tr>
                </thead>
                <tbody>
                    {(subjData.length > 0)
                        ?   subjData.map((row, i) => {
                                if (updateRow === i) {
                                    return(<UpdateGrade row={row} index={i} table={props.subj} close={CloseUpdate}/>)
                                } else {
                                    return(<tr key={`${props.subj}_row${i}`}>
                                            <td className="edit-td"><button onClick={() => setupdateRow(i)}><i className="material-icons" style={{fontSize: "22px"}}>mode_edit</i></button><button onClick={() => confirmDelete(i, row.id)}><i className="material-icons" style={{fontSize: "22px", color: "red"}}>delete_forever</i></button></td>
                                            <td key={`${props.subj}_date${i}`}>{row.date}</td>
                                            <td key={`${props.subj}_desc${i}`}>{row.desc}</td>
                                            <td key={`${props.subj}_weight${i}`} className="weight">{row.weight}</td>
                                            <td key={`${props.subj}_grade${i}`} className="grade">{row.grade}</td>
                                        </tr>)
                                }
                            })
                        :   <tr id="subj_row1">
                                <td className="edit-td"><button onClick={() => alert.error("Keine Noten vorhanden!")}><i className="material-icons" style={{fontSize: "22px"}}>mode_edit</i></button></td>
                                <td id="subj_date1">{today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()}</td>
                                <td id="subj_desc1">Keine Noten gefunden!</td>
                                <td id="subj_weight1" className="weight">0</td>
                                <td className="grade" id="subj_grade1">0</td>
                            </tr>
                    }
                </tbody>
                <tfoot>
                <tr className="subj_row_foot">
                    <td id="desc_avg" className="td_avg_desc" colSpan="4">Durchschnittsnote:</td>
                    {<td id="grade_avg" className={(AvgPoints.avg < 3.75) ? "failed td_avg" : "td_avg"} >{(AvgPoints.avg === "NaN") ? "Kein Durchschnitt" : AvgPoints.avg.toFixed(2) }</td>
                    }
                </tr>
                <tr className="subj_row_foot">
                    <td id="desc_points" className="td_points_desc" colSpan="4">Punkte:</td>
                    <td id="grade_points" className={(AvgPoints.points < 0) ? "failed td_points" : "td_points"}>{(AvgPoints.points || AvgPoints.points === 0) ? AvgPoints.points : "Keine Punkte" }</td>
                </tr>
                </tfoot>
            </table>
            </div>
            <AddGrade subj={props.subj} reload={ReloadPage}/>
        </div>
    )
}


    /*
    <tr id="subj_row1">
        <td id="subj_date1">00/00/0000</td>
        <td id="subj_desc1">Keine Note gefunden</td>
        <td id="subj_weight1" class="weight">0</td>
        <td class="grade" id="subj_grade1">0</td>
    </tr>
    */