import React from 'react';
import '../App.css'

const De = props => {
    return (
        <img className={props.shaked ? 'de shaked' : 'de'} src={props.image[props.valeur]}></img>
    )
}

export default De;