import React, { Component } from 'react';
import "react-router";
import {
  Link
} from 'react-router-dom';


class Navigation extends Component {

  render() {
    return (
      <nav className="navbar nav-dark">
        <ul className="nav-left">
          <li><Link to="/">Leaderboard</Link></li>
          <li><Link to="/bracket">Bracket</Link></li>
          <li className="dropdown">
            <a href="#!">User <i className="icon caret-down-d"></i></a>
            <ul className="dropdown-content">
              <li><Link to="/sign_up">Create an Account!</Link></li>
              <li><Link to="/sign_in">Login</Link></li>
            </ul>
          </li>
        </ul>
        <ul className="nav-right">
          <li><Link to="/sign_up">Create an Account!</Link></li>
          <li><Link to="/sign_in">Login</Link></li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
