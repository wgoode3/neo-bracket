import React, { Component } from 'react';
import { teams } from '../tournament2019';

class ViewGame extends Component {

  constructor(props){
    super(props);
    this.state = {
      team1: "",
      team2: ""
    }
  }

  componentDidMount = () => {
    if(this.props.game.winner !== null){
      if(this.props.game.winner.id === this.props.game.team1.id){
        this.setState({
          team1: "win",
          team2: "loss"
        });
      }else{
        this.setState({
          team1: "loss",
          team2: "win"
        });
      }
    }
  }

  // update where the win and loss classes are if the user views a different bracket
  componentWillUpdate = () => {
    let newState = {};
    if(this.props.game.winner.id === this.props.game.team1.id){
      newState = { team1: "win", team2: "loss" };
    }else{
      newState = { team1: "loss", team2: "win" };
    }
    if(this.state.team1 !== newState.team1){
      this.setState(newState);
    }
  }

  // small change: put in the team name based on what is in the tournament2019.json
  // that way I won't have to make edits for the play-in-games after the fact 
  render() {
    return (
      <div id={"game" + this.props.game.id}>
        <button className={this.state.team1}>
          <span>{this.props.game.team1.seed} {teams[this.props.game.team1.id].name}</span>
        </button>
        <button className={this.state.team2}>
          <span>{this.props.game.team2.seed} {teams[this.props.game.team2.id].name}</span>
        </button>
      </div>
    );
  }

}

export default ViewGame;