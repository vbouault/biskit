import React, { Fragment } from 'react';

const Message = props => {
  return (
  <div id="message">
  <h3>{props.message}</h3>
  {props.message === 'Fait un shi-fu-mi avec qui tu veux' ? <div> <button onClick={props.gagner}>Gagner</button> <button onClick={props.perdu}>Perdu</button></div> : '' }
  </div>
  )
}

export default Message ;