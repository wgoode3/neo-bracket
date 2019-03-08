import React, { Component } from 'react';
import axios from 'axios';


class Leaderboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount = () => {
    axios.get("/users").then(res => {
      this.setState({users: res.data.users});
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <table className="table centered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.users.map(user => 
              <tr key={user._id}>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.location}</td>
                <td>{user.score}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }

}

export default Leaderboard;