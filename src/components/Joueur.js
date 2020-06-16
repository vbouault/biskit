import React from 'react';
import imgChapeau from './image/chapeau.png';

const Joueur = props => {
  return (
  <div className={props.tour ? "containerJoueur tour" : "containerJoueur"}>
  <h3>{props.nom}</h3>
  {props.chapeau ? <img src={imgChapeau} /> : ''}
  </div>
  )
}

export default Joueur ;