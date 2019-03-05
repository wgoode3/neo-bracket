import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "users": [],
      "test_message": ""
    }
  }

  componentDidMount = () => {
    console.log("inside App.js");
    // get request: WORKS
    axios.get("/example").then( res => {
      console.log(res);
      this.setState({
        test_message: res.data.status
      })
    }).catch( err => {
      console.log(err);
    });
    // post request: WORKS
    axios.post("/example", {"test": "12345"}).then( res => {
      console.log(res);
    }).catch( err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <h1>Neo-Bracket</h1>
        <p>Secret message is: {this.state.test_message}</p>
      </div>
    );
  }
}

export default App;
