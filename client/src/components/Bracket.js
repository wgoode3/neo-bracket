import React, { Component } from 'react';
import { teams } from "../tournament";
import Game from "./Game";
import "../bracket.css";


class Tournament {

  constructor(teams) {
    this.games = [];
    let num_rounds = Math.ceil(Math.log2(teams.length));
    let team_index = 0;
    for(let round=1; round<=num_rounds; round++) {
      let num_games = 2 ** (round-1);
      for(let game=0; game<num_games; game++) {
        let t1 = false;
        let t2 = false;
        let game_id = this.games.length;
        if(round === num_rounds) {
          t1 = teams[team_index++];
          t2 = teams[team_index++];
        }
        this.games.push({id: game_id, round: round, team1: t1, team2: t2, winner: null});
      }
    }
  }

}

class Bracket extends Component {

  constructor(props){
    super(props);
    this.state = {
      games: []
    };
  }

  componentDidMount = () => {
    this.setState({
      games: new Tournament(teams).games
    });
  }

  // TODO: fix bug where previous winner remains when 
  // user changes their mind in a previous game
  advance = (game_id, team_id) => {
    let g = [...this.state.games];
    g[game_id].winner = teams[team_id];
    if(game_id > 0){
      let parent = Math.floor((game_id+1)/2)-1;
      if(game_id%2 === 1){
        g[parent].team1 = teams[team_id];
      }else{
        g[parent].team2 = teams[team_id];
      }
    }
    this.setState({
      games: g
    });
    if(game_id === 0){
      // TODO: this would be better as a modal
      setTimeout( () => {
        console.log("Bracket Complete");
        console.log(this.state.games);
      }, 50);
    }
  }

  render() {
    return (
      <div id="bracket">
        {
          this.state.games.map( game => 
            <Game key={game.id} game={game} gameDecided={this.advance} />
          )
        }
      </div>
    );
  }
  
}

export default Bracket;