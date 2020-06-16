import React, { Component } from 'react';
import './App.css';
import Bouton from './components/Bouton';
import SelectNb from './components/SelectNb';
import image1 from './components/image/1_dot.png';
import image2 from './components/image/2_dots.png';
import image3 from './components/image/3_dots.png';
import image4 from './components/image/4_dots.png';
import image5 from './components/image/5_dots.png';
import image6 from './components/image/6_dots.png';
import MultiDe from './components/MultiDe';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import JoueurList from './components/JoueursList';
import Message from './components/Message';
import ChoosePlayers from './components/ChoosePlayers'

class App extends Component {

  state ={
    tableDe : [image1, image2, image3, image4, image5, image6],
    actualValue :[0,0],
    nbDe:1,
    nbPlayers:2,
    messageBiskit:"",
    joueurs:[
      {
        id: 0,
        nom : '',
        tour : true,
        chapeau : false
      },
      {
        id :1,
        nom : '',
        tour : false,
        chapeau : false
      }
    ]
  }

  handleChangenbPlayer = async (e) => {
    let copieJoueurs = this.state.joueurs.slice()
    await this.setState({ nbPlayers : e.target.value })
    console.log(this.state.nbPlayers)
    if (this.state.nbPlayers > this.state.joueurs.length){
      console.log('add')
      for (let i = this.state.joueurs.length ; i < this.state.nbPlayers ; i++){
        copieJoueurs.push({
          id: i,
          nom : '',
          tour : false,
          chapeau : false
        })
      }
    }
    if (this.state.nbPlayers < this.state.joueurs.length){
      console.log('supp')
      for (let i = this.state.nbPlayers ; i < this.state.joueurs.length ; i++){
        copieJoueurs.pop()
      }
    }
    await this.setState({ joueurs : copieJoueurs })
  }

  handleChangeNom = (e) => {
    const joueurs = this.state.joueurs.map(joueur => {
      if(e.target.id == joueur.id){
        return {...joueur, nom : e.target.value}
      }
      else{
        return joueur
      }
    })
    this.setState({ joueurs })
  }

  handleGetRandom = () => {
    let copie = this.state.actualValue;
    for (let i=0; i < copie.length ; i++){
      copie[i] = Math.floor(6*Math.random()); 
    } 
    console.log(copie.map(x => x+1))
    this.setState({ actualValue : copie }) 
  }

  handleChangeNbDe = event => {
    let nbDe = this.state.nbDe;
    const value = event.target.value;
    nbDe = value;
    console.log(nbDe);
    this.setState({ nbDe })
  }
  handleWin = () => {
    let copieMsg = this.state.messageBiskit;
    copieMsg ="";
    this.setState({ messageBiskit : copieMsg})
  }
  handleLoose = () => {
    let copieJoueurs = this.state.joueurs;
    let copieMsg = this.state.messageBiskit;
    copieMsg ="";
    for (let i=0 ; i < copieJoueurs.length ; i++){
      if (copieJoueurs[i].tour){
        copieJoueurs[i].tour = false;
        if(i === copieJoueurs.length - 1){
          copieJoueurs[0].tour = true;
        }
        else{
          copieJoueurs[i+1].tour = true;
        }
        break;
      }
    }
    this.setState({ joueurs : copieJoueurs })
    this.setState({ messageBiskit : copieMsg })
  }
  handleTourBiskit = () => {
    this.handleGetRandom();
    let copieMsg = this.state.messageBiskit;
    copieMsg ="";
    let copieJoueurs = this.state.joueurs;
    let aLeChapeau = false;
    let quelqunALeChapeau = copieJoueurs.filter(a => a.chapeau).length === 1 ;
    let joueurPrec;
    let joueurSuiv;
    for (let i = 0 ; i < copieJoueurs.length ; i++){
      if (copieJoueurs[i].tour){
        if(i === 0){
          joueurPrec = copieJoueurs[copieJoueurs.length - 1].nom
          joueurSuiv = copieJoueurs[i+1].nom
        }
        else if(i === copieJoueurs.length - 1){
          joueurPrec = copieJoueurs[i-1].nom
          joueurSuiv = copieJoueurs[0].nom
        }
        else{
          joueurPrec = copieJoueurs[i-1].nom
          joueurSuiv = copieJoueurs[i+1].nom
        }
      }
    }
    const takeChapeau = () =>{
      for (let i=0 ; i < copieJoueurs.length ; i++){
        if(copieJoueurs[i].chapeau && copieJoueurs[i].tour){
          if (this.state.actualValue[0] === 2 && this.state.actualValue[1] === 2){
            copieJoueurs[i].chapeau = true;
          }
          else{
            copieJoueurs[i].chapeau = false;
          }
          aLeChapeau = true;
          break;
        }
        else if (!copieJoueurs[i].chapeau && copieJoueurs[i].tour && copieJoueurs.filter(a => a.chapeau).length === 0){
          if (this.state.actualValue[0] === 2 && this.state.actualValue[1] === 2){
            copieJoueurs[i].chapeau = false;
          }
          else{
            copieJoueurs[i].chapeau = true;
          }
          aLeChapeau = false;
          break;
        }
      }
    }
    const notDrink = () =>{
      for (let i=0 ; i < copieJoueurs.length ; i++){
        if (copieJoueurs[i].tour){
          copieJoueurs[i].tour = false;
          if(i === copieJoueurs.length - 1){
            copieJoueurs[0].tour = true;
          }
          else{
            copieJoueurs[i+1].tour = true;
          }
          break;
        }
      }
    }
    if (this.state.actualValue[0] === this.state.actualValue[1]){
      if (this.state.actualValue[0] === 2){
        takeChapeau();
        if (aLeChapeau){
          copieMsg = "Tu distribue 3 gorgées, tu perd le chapeau et tu le reprend !"
        }
        else if (!aLeChapeau && quelqunALeChapeau){
          copieMsg = ` Combo !! 2 gorgées pour ${copieJoueurs.filter(a => a.chapeau)[0].nom} et tu distribue 3 gorgées !`
        }
        else{
          copieMsg = "Tu distribue 3 gorgées, tu prend le chapeau et tu l'enlève "
        }
      }
      else{
        copieMsg = `Distribue ${this.state.actualValue[0]+1} gorgées`
      }
    }
    else if (this.state.actualValue[0] === 2 || this.state.actualValue[1] === 2){
      takeChapeau();
      if (this.state.actualValue[0] === 3 || this.state.actualValue[1] === 3){
        if (aLeChapeau){
          copieMsg = "Génerale et tu perd le chapeau"
        }
        else if (!aLeChapeau && quelqunALeChapeau){
          copieMsg = ` Générale et 1 gorgée en plus pour ${copieJoueurs.filter(a => a.chapeau)[0].nom} !`
        }
        else{
          copieMsg = "Générale et tu prend le chapeau !"
        }
      }
      else if (this.state.actualValue[0] === 5 || this.state.actualValue[1] === 5){
        if (aLeChapeau){
          copieMsg = `1 gorgée pour ${joueurPrec} et tu perd le chapeau` 
        }
        else if (!aLeChapeau && quelqunALeChapeau){
          if (joueurPrec === copieJoueurs.filter(a => a.chapeau)[0].nom){
            copieMsg = `2 gorgées pour ${joueurPrec} !`
          }
          else{
            copieMsg = `1 gorgée pour ${joueurPrec} et ${copieJoueurs.filter(a => a.chapeau)[0].nom} !`
          }
        }
        else{
          copieMsg = `1 gorgée pour ${joueurPrec} et tu prend le chapeau !`
        }
      }
      else{
        if (aLeChapeau){
          notDrink();
          copieMsg = "Tu perd le chapeau"
        }
        else if (!aLeChapeau && quelqunALeChapeau){
          copieMsg = ` 1 gorgée pour ${copieJoueurs.filter(a => a.chapeau)[0].nom} !`
        }
        else{
          notDrink();
          copieMsg = "tu prend le chapeau !"
        }
      }
    }
    else if (((this.state.actualValue[0] === 4 && this.state.actualValue[1] === 1) || (this.state.actualValue[0] === 1 && this.state.actualValue[1] === 4)) || ((this.state.actualValue[0] === 5 && this.state.actualValue[1] === 0) || (this.state.actualValue[0] === 0 && this.state.actualValue[1] === 5))){
      copieMsg = "Générale !"
    }
    else if ((this.state.actualValue[0] === 4 && this.state.actualValue[1] === 3) || (this.state.actualValue[0] === 3 && this.state.actualValue[1] === 4)){
      copieMsg = ` 1 gorgée pour ${joueurPrec}`
    }
    else if ((this.state.actualValue[0] === 4 && this.state.actualValue[1] === 5) || (this.state.actualValue[0] === 5 && this.state.actualValue[1] === 4)){
      copieMsg = ` 1 gorgée pour ${joueurSuiv}`
    }
    else if ((this.state.actualValue[0] === 3 && this.state.actualValue[1] === 5) || (this.state.actualValue[0] === 5 && this.state.actualValue[1] === 3)){
      copieMsg = 'Fait un shi-fu-mi avec qui tu veux'
    }
    else{
      copieMsg = `Perdu`;
      notDrink();
    }

    this.setState({ messageBiskit : copieMsg })
    this.setState({ joueurs : copieJoueurs })

  }

  render(){
    return (
      <Router>
        <div className="App">
        {/*   <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/multi-dé">Jeux de dés classic</Link>
              </li>
              <li >
                <Link to="/biskit">Biskit !</Link>
              </li>
            </ul>
          </nav> */}
          <Switch>
{/*             <Route path="/multi-dé">
              <SelectNb changeNb={this.handleChangeNbDe} />
              <MultiDe actualValue={this.state.actualValue} nbDe={this.state.nbDe} tableDe={this.state.tableDe}/>
              <Bouton changeValue={this.handleGetRandom} />
            </Route> */}
            <Route path="/biskit" >
              <div className="containerListDe">
                <div className="containerList">
                  <JoueurList joueurs={this.state.joueurs} />
                </div>
                <div className="containerMid">
                  <Message message={this.state.messageBiskit} gagner={this.handleWin} perdu={this.handleLoose}/>
                  <MultiDe actualValue={this.state.actualValue} nbDe={2} tableDe={this.state.tableDe}/>
                  <Bouton changeValue={this.handleTourBiskit}  />
                </div>
              </div>
            </Route>
            <Route exact path="/">
              <ChoosePlayers handleChangenbPlayer={this.handleChangenbPlayer} nbPlayers={this.state.nbPlayers} joueurs={this.state.joueurs} handleChangeNom={this.handleChangeNom}/>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
  
}

const Home = () => {
  return <h2>Home</h2>
}

export default App;
