import React, { Component } from 'react';
import "react-router";
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';
import Navigation from './components/Navigation';
import Leaderboard from './components/Leaderboard';
import Bracket from './components/Bracket';
import ViewBracket from './components/ViewBracket';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import UserEdit from './components/UserEdit';
import Admin from './components/Admin';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: "",
        bracket: []
      }
    }
  }

  componentDidMount = () => {
    if(localStorage.getItem("user_id")){
      this.getUser();
    }
  }

  getUser = () => {
    let user_id = localStorage.getItem("user_id");
    axios.get(`/users/${user_id}`).then( res => {
      if(res.data.user){
        this.setState({ user: res.data.user });
      } else {
        localStorage.removeItem("user_id");
      }
    }).catch( err => {
      console.log("something went wrong",  err);
    });
  }

  removeUser = () => {
    axios.get("/api/logout").then( res => {
      localStorage.removeItem("user_id");
      this.setState({ user: {first_name: "", bracket: []} });
    }).catch( err => {
      console.log("something went wrong", err);
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="router">
          <Navigation user={this.state.user} onLogout={this.removeUser} />
          <div className="container">
            <Route exact path="/" component={Leaderboard} />
            <Route path="/bracket" component={Bracket} />
            <Route 
              path="/mybracket"
              render={(props) => <ViewBracket {...props} games={this.state.user.bracket} />}
            />
            <Route 
              path='/sign_in' 
              render={(props) => <UserLogin {...props} onLogin={this.getUser} />} 
            />
            <Route 
              path="/sign_up"
              render={(props) => <UserRegister {...props} onRegister={this.getUser} />}
            />
            <Route path="/edit" component={UserEdit} />
            <Route path="/admin" component={Admin} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;