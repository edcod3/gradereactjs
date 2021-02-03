import React, {useState, useRef} from "react";
import TInput from "./calcInput";

function App() {
  const [gradeVal, setgradeVal] = useState("Noch nicht berechnet worden!")
  const gradeInps = useRef({})
  const [displayGrade, setDG] = useState(false);
  const [rows, setRows] = useState([{id: 1}, {id: 2}])
  const [addval, calcval]=["Reihe hinzufügen", "Calculate Grade!"]

  const GetVals = () => {
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
    
  }

  function AddRow() {
    setRows(prevRows => {
      return [...prevRows, {id: rows.length + 1}]
    })
  }

  return (
    <>
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
          return <tr id={"row" + row.id}>
          <TInput />
          <td><input type="text" ref={el => gradeInps.current["grade" + row.id] = el} id={"grade" + row.id}></input></td>
      </tr>
      })}
      </tbody>
      <tfoot className="average" id="average_tfoot" style={displayGrade ? {"display": "table-footer-group"}: {"display": "none"} }>
      <tr>
      <td colSpan="3" id="calc_avg_desc">Deine Durchschnittsnote ist: </td>
      <td id="calc_avg_grade">{gradeVal}</td>
      </tr>
      </tfoot>
      </table>
    <button value={calcval} onClick={Calculate} className="calc_btn"><span>Durchschnitt</span></button>
    <input className="add_btn" type="button" value={addval} onClick={AddRow}></input>
    </>
  );
}

export default App;

