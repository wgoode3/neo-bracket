import React, { Component } from 'react';
import "react-router";
import { Link } from 'react-router-dom';


class Navigation extends Component {

  render() {
    return (
      <nav className="navbar nav-dark">
        <ul className="nav-left">
          <li><a href="#!">Dojo Bracket</a></li>
          <li><Link to="/">Bracket</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
        </ul>
        <ul className="nav-right">
          <li className="dropdown">
            <a href="#!">User ▼</a>
            <ul className="dropdown-content">
              <li><Link to="/sign_up">Sign Up</Link></li>
              <br />
              <li><Link to="/sign_in">Sign In</Link></li>
              <br />
              <li><Link to="/edit">Edit User</Link></li>
              <br />
              <li><Link to="/sign_out">Sign Out</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }

}

export default Navigation;