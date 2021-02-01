import React, {useState, useEffect} from 'react'
import axios from 'axios' 
import CalcGradeAvg from './utils/calcgrade'
import { SubjName } from './utils/scripts'
import AddGrade from './addgrade'

export default function Subject(props) {

    const [reload, setReload] = useState(false)
    const [AvgPoints, setAvgPoints] = useState({avg: 0, points: 0})
    const [subjData, setsubjData] = useState([])

    const today = new Date();

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

    useEffect(() => {
        setsubjData([])
        setAvgPoints({avg: 0, points: 0})
        //console.log(subj_url)
        axios.get(subj_url, {headers: {'Content-Type': 'application/json'}})
            .then(res => {
                //console.log(res.data)
                GetAvg(res.data.response)
                setsubjData(res.data.response)
            })
            .catch(err => console.log(err))
    }, [subj_url, reload])

    return (
        <div>
            <div id="wrapper_show" class="wrapper">
                <h2 id="your_grades">{SubjName(props.subj)}: Deine Noten</h2>
                <table id="subj_table">
                <thead>
                <tr id="row_head">
                    <th id="th_date">Datum</th>
                    <th id="th_desc">Beschreibung</th>
                    <th id="th_weight" class="weight">Gewicht</th>
                    <th class="grade" id="th_grade">Note</th>
                </tr>
                </thead>
                <tbody>
                    {(subjData.length > 0)
                        ?   subjData.map((row, i) => {
                            return(<tr key={`${props.subj}_row${i}`}>
                                    <td key={`${props.subj}_date${i}`}>{row.date}</td>
                                    <td key={`${props.subj}_desc${i}`}>{row.desc}</td>
                                    <td key={`${props.subj}_weight${i}`} class="weight">{row.weight}</td>
                                    <td key={`${props.subj}_grade${i}`} class="grade">{row.grade}</td>
                                </tr>)
                            })
                        :   <tr id="subj_row1">
                                <td id="subj_date1">{today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()}</td>
                                <td id="subj_desc1">Keine Noten gefunden!</td>
                                <td id="subj_weight1" class="weight">0</td>
                                <td class="grade" id="subj_grade1">0</td>
                            </tr>
                    }
                </tbody>
                <tfoot>
                <tr class="subj_row_foot">
                    <td id="desc_avg" class="td_avg_desc" colspan="3">Durchschnittsnote:</td>
                    {<td id="grade_avg" className={(AvgPoints.avg < 3.75) ? "failed td_avg" : "td_avg"} >{(isNaN(AvgPoints.avg)) ? "Kein Durchschnitt" : AvgPoints.avg.toFixed(2) }</td>
                    }
                </tr>
                <tr class="subj_row_foot">
                    <td id="desc_points" class="td_points_desc" colspan="3">Punkte:</td>
                    <td id="grade_points" class={(AvgPoints.points < 0) ? "failed td_points" : "td_points"}>{(AvgPoints.points || AvgPoints.points === 0) ? AvgPoints.points : "Keine Punkte" }</td>
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