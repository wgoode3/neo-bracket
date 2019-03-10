import React, { Component } from 'react';


class Game extends Component {

  constructor(props){
    super(props);
    this.state = {
      team1: "",
      team2: ""
    }
  }

  componentDidMount = (e) => {
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

  advance = (team_id, e) => {
    if(this.props.game.team1 && this.props.game.team2) {
      this.props.gameDecided(this.props.game.id, team_id);
      this.applyStyling(e.target);
    }
  }

  applyStyling(element){
    let ele = element;
    if(ele.tagName === "SPAN"){
      ele = ele.parentNode;
    }
    for(let child of ele.parentNode.childNodes){
      child.classList.remove('win');
      child.classList.add('loss');
    }
    ele.classList.remove('loss');
    ele.classList.add('win');
  }

  render() {
    return (
      <div id={"game" + this.props.game.id}>
        <button onClick={this.advance.bind(this, this.props.game.team1.id)} disabled={!this.props.game.team1} className={this.state.team1}>
          {
            (this.props.game.team1) ? 
            <span>{this.props.game.team1.seed} {this.props.game.team1.name}</span> : 
            <span></span>
          }
        </button>
        <button onClick={this.advance.bind(this, this.props.game.team2.id)} disabled={!this.props.game.team2} className={this.state.team2}>
          {
            (this.props.game.team2) ? 
            <span>{this.props.game.team2.seed} {this.props.game.team2.name}</span> : 
            <span></span>
          }
        </button>
      </div>
    );
  }

}

export default Game;