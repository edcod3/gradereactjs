import React, {useState} from 'react'
//import {useRef} from 'react'
//import TInput from "./redundatn/calcInput";
import CalcGradeAvg from './utils/calcgrade.js'

export default function Calculator() {
    const [gradeVal, setgradeVal] = useState({avg: 0, points: 'Keine Punkte'})
    //const gradeInps = useRef({})
    //const [gradeInputs, setgradeInputs] = useState([])
    //const [weightInputs, setweightInputs] = useState([])
    const [displayGrade, setDG] = useState(false);
    const [rows, setRows] = useState([{id: 1, weight: '', grade: ''}, {id: 2, weight: '', grade: ''}])
    const [addval, calcval]=["Reihe hinzufügen", "Calculate Grade!"]

    /*const GetVals = () => {
        const ValArray = [];
        for (let i=1; i <= rows.length; i++) {
            const singID = "grade" + i;
            const singleVal = gradeInps.current[singID].value
            ValArray.push(singleVal)
        }
        return ValArray
        }

    function Calculate() {
        const InpVals = GetVals();
        const Sum = InpVals.reduce((a, b) =>{ return Number(a)+Number(b)})
        const Avg = Sum / InpVals.length;
        let DisplayCopy = displayGrade;
        setgradeVal(Avg)
        DisplayCopy = true;
        setDG(DisplayCopy);
    }*/

    function CalcGrade() {
      const weights = rows.map(row => (!row.weight) ? 1 : parseFloat(row.weight))
      const grades = rows.map(row => parseFloat(row.grade));
      console.log(weights)
      console.log(grades)
      const [avg, points] = CalcGradeAvg(weights, grades);
      setgradeVal({avg: avg, points: points})
      setDG(true);
    }

    const SetGrade = (name, index) => {
        return ({target: {value}}) => {
          const newrows = rows.map(row => {
            if (row.id === index && name === "weight") {
              return {id: row.id, [name]: value, grade: row.grade}
            } else if (row.id === index && name === "grade") {
              return {id: row.id, weight: row.weight, [name]: value}
            } else {
              return row
            }
          })
          setRows(newrows)
        }
      }

    /*const setWeight = (event) => {
      setweightInputs(prevVal => {
        return [...prevVal, event.target.value]
      })
    }*/

    function AddRow() {
        setRows(prevRows => {
            return [...prevRows, {id: rows.length + 1, weight: '', grade: ''}]
        })
    }

    /* To-Do:
            - Add weight inclusion for grade calculation
            - Implement Selection of subjects to prefill input rows
            - Replace useRef with useState OR understand how useRef works and implement properly
    */

    return (
        <div id="calc_wrapper" className="wrapper">
        <h2>Noten-Rechner</h2>
        <h3>Gib deine Noten ein:</h3>
        <table id="inputTable">
        <tbody id="TableBody">
            <tr>
                <th>Fach</th>
                <th>Beschreibung</th>
                <th>Gewicht</th>
                <th>Note</th>
            </tr>
            {rows.map(row => {
                return(<tr key={"row" + row.id}>
                        <td><input type="text" id={"subj" + row.id}></input></td>
                        <td><input type="text" id={"desc" + row.id}></input></td>
                        <td><input type="text" id={"weight" + row.id} value={row.weight} onChange={SetGrade("weight", row.id)}></input></td>
                        <td><input type="text" id={"grade" + row.id} value={row.grade} onChange={SetGrade("grade", row.id)}></input></td>
                    </tr>
            )})}
        </tbody>
        <tfoot className="average" id="average_tfoot" style={displayGrade ? {"display": "table-footer-group"}: {"display": "none"} }>
        <tr>
            <td colSpan="3" id="calc_avg_desc">Deine Durchschnittsnote ist: </td>
            <td id="calc_avg_grade">{(!gradeVal.avg) ? "Kein Durchschnitt" : gradeVal.avg.toFixed(2)}</td>
        </tr>
        <tr className="average">
              <td id="calc_pts_desc" colSpan="3">Punkte:</td>
              <td id="calc_points" className={(gradeVal.points < 0) ? "failed td_points" : "td_points"}>{gradeVal.points}</td>
        </tr>
        </tfoot>
        </table>
        <button value={calcval} onClick={CalcGrade} className="calc_btn"><span>Durchschnitt</span></button>
        <input className="add_btn" type="button" value={addval} onClick={AddRow}></input>
        </div>
    )
}


