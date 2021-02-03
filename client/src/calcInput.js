import React from 'react'

export default function TInput() {
    const inputArray = [1,2,3]
    const inputString = ["subject", "desc", "weight"] 
    return (
        inputArray.map(inpNum => {
        return <td><input type="text" id={inputString[inpNum] + inpNum}></input></td>
        })
    )
}
