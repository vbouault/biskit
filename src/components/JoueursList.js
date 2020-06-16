import React from 'react';
import Joueur from './Joueur';

const JoueurList = props => {
  return (
    props.joueurs.map(joueur => {
      return <Joueur key={joueur.nom} nom={joueur.nom} chapeau={joueur.chapeau} tour={joueur.tour}/>
    })
  )
}

export default JoueurList ;