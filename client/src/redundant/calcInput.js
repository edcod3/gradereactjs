import React from 'react'

export default function TInput(props) {
    const inputString = ["subject", "desc", "weight"] 
    return (
        inputString.map(inpNum => {
        return <td key={"td_" + inpNum + props.id}><input type="text" id={inpNum + props.id}></input></td>
        })
    )
}
