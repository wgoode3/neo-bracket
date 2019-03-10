import React, { Component } from 'react';
import "react-router";
import { Link, withRouter } from 'react-router-dom';


class Navigation extends Component {

  constructor(props) {
    super(props);
  }

  logout = (e) => {
    e.preventDefault();
    this.props.onLogout();
    this.props.history.push("/");
  }

  doNothing = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <nav className="navbar nav-dark">
        <ul className="nav-left">
          <li><a href="#!" onClick={this.doNothing}>Dojo Bracket</a></li>
          <li><Link to="/">Leaderboard</Link></li>
          {
            (this.props.user.bracket_complete) ?
            <li><Link to="/mybracket">My Bracket</Link></li> :
            <li><Link to="/bracket">My Bracket</Link></li>
          }
        </ul>
        <ul className="nav-right">
          <li className="dropdown">
            <a href="#!" onClick={this.doNothing}>
              {
                (this.props.user.first_name) ? 
                this.props.user.first_name + " ▼" : 
                "User ▼"
              }
            </a>
            <ul className="dropdown-content">
              {
                (this.props.user.first_name) ? 
                <li><Link to="/edit">Edit User</Link></li> : 
                <li><Link to="/sign_up">Sign Up</Link></li>
              }
              <br />
              {
                (this.props.user.first_name) ? 
                <li><a href="#!" onClick={this.logout}>Sign Out</a></li> : 
                <li><Link to="/sign_in">Sign In</Link></li>
              }              
            </ul>
          </li>
        </ul>
      </nav>
    );
  }

}

export default withRouter(Navigation);