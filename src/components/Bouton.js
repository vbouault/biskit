import React from 'react';

const Bouton = props => {
  return (
    <div className='containerBtn'>
      <button onClick={props.changeValue} className='btn btn-outline-primary'>Lancer les dés</button>
    </div>
  )
}

export default Bouton ;