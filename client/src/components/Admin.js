import React, { Component } from 'react';
import axios from 'axios';
import { teams } from "../tournament2017";
import Game from "./Game";
import Tournament from '../generateBracket';

class Admin extends Component {

  constructor(props){
    super(props);
    this.state = {
      games: []
    }
  }

  componentDidMount = () => {
    let user_id = localStorage.getItem("user_id");
    if(!user_id) {
      this.props.history.push("/");
    }
    axios.get("/api/admin").then( res => {
      if(!res.data.auth) {
        this.props.history.push("/");
      } else {
        this.setState({games: res.data.user.bracket});
      }
    }).catch( err => {
      console.log("something went wrong", err);
    });
  }

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
  }

  reset = () => {
    this.setState({games: new Tournament(teams).games});
  }

  save = () => {
    axios.post("/api/admin", this.state.games).then( res => {
      console.log(res);
    }).catch( err => {
      console.log("something went wrong", err);
    })
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Admin</h1>
        <div class="view-bracket">
          {
            this.state.games.map( game => 
              <Game key={game.id} game={game} gameDecided={this.advance} />
            )
          }
        </div>
        <p className="text-center">
          <button className="is-info" onClick={this.reset}>Reset</button>
          <button className="is-successful" onClick={this.save}>Save</button>
        </p>
      </div>
    );
  }

}

export default Admin;