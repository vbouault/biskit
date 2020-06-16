import React , { useState }from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import '../App.css';
import { Link } from 'react-router-dom';


const ChoosePlayers = ({ handleChangenbPlayer, nbPlayer, joueurs, handleChangeNom}) => {


  return (
    <div className='choosePlayerContainer'>
      <InputLabel id="demo-simple-select-outlined-label">Nombre de joueurs</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={nbPlayer}
        onChange={(e)=>handleChangenbPlayer(e)}
      >
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={11}>11</MenuItem>
        <MenuItem value={12}>12</MenuItem>
      </Select>
      {joueurs.map(joueur => {
        return <TextField label={`joueur ${joueur.id+1}`} variant="outlined" id={joueur.id} value={joueur.nom} onChange={(e)=> handleChangeNom(e)}/>
      })}
      <Link to="/biskit"><button className='btn btn-outline-primary'>Let's Go</button></Link>
    </div>
  )
}

export default ChoosePlayers

