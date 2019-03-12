import React, { Component } from 'react';
import axios from 'axios';
import { teams } from "../tournament2018";
import Tournament from '../generateBracket';
import Game from "./Game";
import UserRegister from './UserRegister';


class Bracket extends Component {

  constructor(props){
    super(props);
    this.state = {
      user_exists: false,
      games: []
    };
  }

  open = () => {
    document.getElementById("submit-modal").classList.add("activated");
  }

  close = (e) => {
    document.getElementById("submit-modal").classList.remove("activated");
  }

  hide = (e) => {
    document.getElementById("new-user").style.display = "none";
  }

  save = (e) => {
    let user_id = localStorage.getItem("user_id");
    if(user_id){
      axios.put(`/api/bracket/${user_id}`, this.state.games).then( res => {
        this.props.history.push("/");
      }).catch(err => {
        console.log("something went wrong", err);
      });
    } else {
      document.getElementById("register-modal").classList.add("activated");
    }
  }

  userCreated = () => {
    this.props.onRegister();
    this.setState({
      user_exists: localStorage.getItem("user_id") !== null
    });
    document.getElementById("register-modal").classList.remove("activated");
  }

  componentDidMount = () => {
    this.setState({
      user_exists: localStorage.getItem("user_id") !== null,
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
      this.open();
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
        </div>

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
                {
                  (this.state.user_exists) ? 
                  "" : 
                  "You will have to create an account to save your bracket."
                }
              </p>
              <p>
                <button className="is-successful pull-left center-vertical" onClick={this.save}>Yes save it!</button>
                <button className="is-link pull-right center-vertical" onClick={this.close}>Just a few more!</button>
              </p>
            </div>
          </div>
        </div>

        <div className="modal" id="register-modal">
          <div class="nudge-up">
            <UserRegister onRegister={this.userCreated} />
          </div>
        </div>

      </div>
    );
  }
  
}

export default Bracket;