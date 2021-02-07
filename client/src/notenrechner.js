import React, {useState} from 'react'
import axios from 'axios'
//import {useRef} from 'react'
//import TInput from "./redundatn/calcInput";
import CalcGradeAvg from './utils/calcgrade.js'
import {subjtables, SubjName, SessionLogout} from './utils/scripts'
import {GetApiUrl} from './utils/apiurl'

export default function Calculator() {

    //Enable express-session persistence
    axios.defaults.withCredentials = true;
    
    const [gradeVal, setgradeVal] = useState({avg: 0, points: 'Keine Punkte'})
    //const gradeInps = useRef({})
    //const [gradeInputs, setgradeInputs] = useState([])
    //const [weightInputs, setweightInputs] = useState([])
    const [displayGrade, setDG] = useState(false)
    const intialRows = [{id: 1, weight: '', grade: ''}]
    const [rows, setRows] = useState(intialRows)
    const [addval, calcval]=["Reihe hinzufügen", "Calculate Grade!"]
    const tables = subjtables

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
        let lastrowid = rows.length - 1
        let newrow = rows[lastrowid].id + 1
        setRows(prevRows => {
            return [...prevRows, {id: newrow, weight: '', grade: ''}]
        })
    }

    /* To-Do:
            - Add weight inclusion for grade calculation -> Done
            - Implement Selection of subjects to prefill input rows
    */
    function GetSubjData(event) {
      console.log(`${event.target.value}`)
      if (`${event.target.value}` !== "" ) {
        const subj_url = `http://${GetApiUrl()}/${event.target.value}`
        axios.get(subj_url, {headers: {'Content-Type': 'application/json'}})
        .then(res => {
          const newarray = res.data.response.concat(intialRows)
          setRows(newarray)
        })
        .catch(err => SessionLogout(err))
      } else {
        setRows(intialRows)
      }
    }

    return (
        <div id="calc_wrapper" className="wrapper">
        <h2>Noten-Rechner</h2>
        <h3>Wähle dein Fach</h3>
        <select id="subjects" onChange={GetSubjData}>
          <option value="">Wähle ein Fach</option>
          {tables.map(subj => {
            return(<option key={subj} value={subj}>{SubjName(subj)}</option>)
          })}
        </select>
        <br />
        <h3>Gib deine Noten ein:</h3>
        <table id="inputTable">
        <tbody id="TableBody">
            <tr>
                <th>Beschreibung</th>
                <th>Gewicht</th>
                <th>Note</th>
            </tr>
            {rows.map(row => {
                      console.log(row)
                      if (row.desc) {
                        return(<tr key={"row" + row.id} className="subjdata">
                          <td>{row.desc}</td>
                          <td>{row.weight}</td>
                          <td>{row.grade}</td>
                          </tr>
                        )
                      } else {
                        return(<tr key={"row" + row.id}>
                          <td style={{color: "black"}}>Notenrechner{(window.innerWidth <= 488) ? <br /> : " "}{`(Note ${row.id})`}</td>
                          <td><input type="text" id={"weight" + row.id} value={row.weight} onChange={SetGrade("weight", row.id)}></input></td>
                          <td><input type="text" id={"grade" + row.id} value={row.grade} onChange={SetGrade("grade", row.id)}></input></td>
                        </tr>
              )}})}
        </tbody>
        <tfoot className="average" id="average_tfoot" style={displayGrade ? {"display": "table-footer-group"}: {"display": "none"} }>
        <tr>
            <td colSpan="2" id="calc_avg_desc"><p>{(window.innerWidth <= 475) ? "Deine Durchschnittsnote: " : "Deine Durchschnittsnote ist:"}</p></td>
            <td id="calc_avg_grade">{(!gradeVal.avg) ? "Kein Durchschnitt" : gradeVal.avg.toFixed(2)}</td>
        </tr>
        <tr className="average">
              <td id="calc_pts_desc" colSpan="2">Punkte:</td>
              <td id="calc_points" className={(gradeVal.points < 0) ? "failed td_points" : "td_points"}>{gradeVal.points}</td>
        </tr>
        </tfoot>
        </table>
        <button value={calcval} onClick={CalcGrade} className="calc_btn"><span>Durchschnitt</span></button>
        <input className="add_btn" type="button" value={addval} onClick={AddRow}></input>
        </div>
    )
}


