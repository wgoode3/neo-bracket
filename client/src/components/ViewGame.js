import React, { Component } from 'react';


class ViewGame extends Component {

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

  render() {
    return (
      <div id={"game" + this.props.game.id}>
        <button className={this.state.team1}>
          <span>{this.props.game.team1.seed} {this.props.game.team1.name}</span>
        </button>
        <button className={this.state.team2}>
          <span>{this.props.game.team2.seed} {this.props.game.team2.name}</span>
        </button>
      </div>
    );
  }

}

export default ViewGame;