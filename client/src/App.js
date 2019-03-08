import React, { Component } from 'react';
import "react-router";
import { BrowserRouter, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Leaderboard from './components/Leaderboard';
import Bracket from './components/Bracket';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import UserEdit from './components/UserEdit';


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <div className="container">
            <Route exact path="/" component={Leaderboard} />
            <Route path="/bracket" component={Bracket} />
            <Route path="/sign_in" component={UserLogin} />
            <Route path="/sign_up" component={UserRegister} />
            <Route path="/edit" component={UserEdit} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
  
}

export default App;