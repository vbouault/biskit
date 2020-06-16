import React from 'react';
import De from './DE'

const MultiDe = props => {
  return (
    <div className="containerDe">
    {props.actualValue
      .filter((value, index) => {
        return index < props.nbDe 
      })
      .map( (value,index) => (
        <De key={index} image={props.tableDe} valeur={props.actualValue[index]}/>
      ))}
  </div> 
  )
}

export default MultiDe ;