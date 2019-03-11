import React, { Component } from 'react';
import axios from 'axios';
import ViewBracket from './ViewBracket';
import Footer from './Footer';


class Leaderboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filter: [],
      info: []
    };
  }

  componentDidMount = () => {
    axios.get("/api/users").then(res => {
      this.setState({users: res.data.users, filter: res.data.users});
    }).catch(err => {
      console.log("something went wrong", err);
    });
  }

  view = (user_id) => {
    for(let user of this.state.users) {
      if(user._id === user_id) {
        this.setState({ info: user.bracket });
        break
      }
    }
    document.getElementById("bracket-modal").classList.add("activated");
  }

  checkClose = (e) => {
    if(e.target.id === "bracket-modal"){
      this.close();
    }
  }

  close = (e) => {
    document.getElementById("bracket-modal").classList.remove("activated");
  }

  filter = (e) => {
    let loc = e.target.value;
    if(loc !== "All") {
      let users = [];
      for(let user of this.state.users) {
        if(user.location === loc) {
          users.push(user);
        }
      }
      this.setState({filter: users});
    } else {
      this.setState({filter: this.state.users});
    }
  }

  render() {
    return (
      <div>
        <div className="select-group col-s-4">
          <select name="location" id="location" onChange={this.filter}>
            <option>All</option>
            <option>Berkeley, CA</option>
            <option>Boise, ID</option>
            <option>Burbank, CA</option>
            <option>Chicago, IL</option>
            <option>Dallas, TX</option>
            <option>Orange County, CA</option>
            <option>San Jose, CA</option>
            <option>Seattle, WA</option>
            <option>Tulsa, OK</option>
            <option>Tysons Corner, VA</option>
            <option>Online</option>
            <option>Other</option>
          </select>
          <label htmlFor="location">Filter by location</label>
        </div>
        <table className="table centered">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Score</th>
              <th>Name</th>
              <th>Location</th>
              <th>Bracket</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.filter.map(user => 
                <tr key={user._id}>
                  <td>{user.rank}</td>
                  <td>{user.score}</td>
                  <td>{user.first_name} {user.last_name}</td>
                  <td>{user.location}</td>
                  <td>
                    {
                      (user.bracket_complete) ? 
                      <button 
                        className="is-primary" 
                        onClick={this.view.bind(this, user._id)}
                      >
                        View
                      </button> : 
                      <p>Bracket Incomplete</p>
                    }
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
        <div className="modal" id="bracket-modal" onClick={this.checkClose}>
          <div className="modal-content">
            <span className="close dark top-right" onClick={this.close}>&times;</span>
            <ViewBracket games={this.state.info}/>
          </div>
        </div>

        <Footer />

      </div>
    );
  }

}

export default Leaderboard;