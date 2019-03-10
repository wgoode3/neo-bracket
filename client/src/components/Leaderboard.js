import React, { Component } from 'react';
import axios from 'axios';
import ViewBracket from './ViewBracket';
import Footer from './Footer';


class Leaderboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      info: []
    };
  }

  componentDidMount = () => {
    axios.get("/users").then(res => {
      this.setState({users: res.data.users});
    }).catch(err => {
      console.log("something went wrong", err);
    })
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

  close = (e) => {
    document.getElementById("bracket-modal").classList.remove("activated");
  }

  render() {
    return (
      <div>
        <table className="table centered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Bracket</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.users.map(user => 
                <tr key={user._id}>
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
                  <td>{user.score}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        <div className="modal" id="bracket-modal">
          <span className="close top-right" onClick={this.close}>&times;</span>
          <ViewBracket games={this.state.info}/>
        </div>

        <Footer />

      </div>
    );
  }

}

export default Leaderboard;