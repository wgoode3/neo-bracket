import React, { Component } from 'react';
import axios from 'axios';
import ViewBracket from './ViewBracket';


class Leaderboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      location: "All",
      filter: [],
      info: []
    };
  }

  componentDidMount = () => {
    this.getData();
    // updates the data every minute
    this.dataRefresh = setInterval(this.getData, 60000);
  }

  componentWillUnmount = () => {
    clearInterval(this.dataRefresh);
  }

  getData = () => {
    axios.get("/api/users").then(res => {
      this.setState({users: res.data.users, filter: res.data.users}, () => {
        this.filterData();
      });
    }).catch(err => {
      console.log("something went wrong", err);
    });
    
  }

  view = (user_id, e) => {
    e.preventDefault();
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
    this.setState({location: e.target.value}, () => {
      this.filterData();
    });
  }

  filterData = () => {
    if(this.state.location !== "All") {
      let users = [];
      for(let user of this.state.users) {
        if(user.location === this.state.location) {
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
        <table className="table">
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
              this.state.filter.map( (user, index) => 
                <tr key={index}>
                  <td>{user.rank}</td>
                  <td>{user.score}</td>
                  <td>
                    <img src={"/media/" + user.avatar} alt="avatar" className="avatar-m" />
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.location}</td>
                  <td>
                    {
                      (user.bracket_complete) ? 
                      <a 
                        href="#!" 
                        className="modal-link" 
                        onClick={this.view.bind(this, user._id)}
                      >
                        View Bracket
                      </a> : 
                      <p>
                        Bracket Incomplete
                      </p>
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

      </div>
    );
  }

}

export default Leaderboard;