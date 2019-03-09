import React, { Component } from 'react';
import { teams } from "../tournament";
import Game from "./Game";
import "../bracket.css";
import axios from 'axios';


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

  getUser = (cb) => {
    let user_id = localStorage.getItem("user_id");
    if(user_id !== null){
      axios.get(`/users/${user_id}`).then( res => {
        console.log(res);
        if(res.data.user.bracket_complete) {
          cb(res.data.user.bracket);
        } else {
          cb(null);
        }
      }).catch( err => {
        console.log("something went wrong",  err);
      });
    } else {
      cb(null);
    }
  }

  close = (e) => {
    document.getElementById("submit-modal").classList.remove("activated");
  }

  hide = (e) => {
    document.getElementById("new-user").style.display = "none";
  }

  save = (e) => {
    console.log("saving that thing", this.state.games);
    let user_id = localStorage.getItem("user_id");
    axios.post(`/bracket/${user_id}`, this.state.games).then( res => {
      console.log(res);
      this.props.history.push("/");
    }).catch(err => {
      console.log(err);
    });
  }

  componentDidMount = () => {
    this.getUser( games => {
      if(games){
        this.setState({
          games: games
        });
      } else {
        this.setState({
          games: new Tournament(teams).games
        });
      }
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
      document.getElementById("submit-modal").classList.add("activated");
    }
  }

  render() {
    return (
      <div>

        <div className="message" id="new-user">
          <h4 className="heading">
            <span className="close" onClick={this.hide}>&times;</span>
            Message
          </h4>
          <div className="message-content">
            <p>
              To fill out your bracket, click on a team to select the game's winner. Numbers indicate the 'seed' or relative strength of the team, where lower numbers are stronger than higher numbers. With each successive round you receive more points for correct predictions. Good luck! 
            </p>
            <p>
              <strong>Note:</strong> after you finish filling out the bracket, you will be prompted to save it.
            </p>
          </div>
        </div>

        <div id="bracket">
          {
            this.state.games.map( game => 
              <Game key={game.id} game={game} gameDecided={this.advance} />
            )
          }
          <div className="modal" id="submit-modal">
            <div className="message">
              <h4 className="heading">
                <span className="close" onClick={this.close}>&times;</span>
                Are you done making edits?
              </h4>
              <div className="message-content">
                <p>
                  It looks like you've finished filling out your bracket. You will not be able to update your bracket after submitting. If you wish to make more changes before submitting you can do so now.
                </p>
                <p>
                  <strong>Note:</strong> you have to select the winner of the championship game to return to this dialog.
                </p>
                <p>
                  <button className="is-successful pull-left center-vertical" onClick={this.save}>Yes save it!</button>
                  <button className="is-link pull-right center-vertical" onClick={this.close}>Just a few more!</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default Bracket;