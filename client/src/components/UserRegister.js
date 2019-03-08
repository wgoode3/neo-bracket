import React, { Component } from 'react';
import axios from 'axios';


function serialize(form){
  let fd = {};
  function getData(ele){
    if(ele.tagName === "INPUT" && ele.type !== "submit"){
      fd[ele.name] = ele.value;
    }else if(ele.tagName === "SELECT"){
      fd[ele.name] = ele.value;
    }
    for(let child of ele.childNodes){
      getData(child);
    }
  }
  getData(form);
  return fd;
}

class UserRegister extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: {
        "username": "",
        "email": "",
        "password": "",
        "confirm": ""
      },
      errors: {}
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({user: serialize(e.target)}, () => {
      axios.post("/user", this.state.user).then( res => {
        console.log(res);
      }).catch(err => {
        console.log("something went wrong", err);
      });
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input type="text" name="username" id="username" placeholder="Username" autoComplete="username" />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-group">
            <input type="text" name="email" id="email" placeholder="Email" autoComplete="email" />
            <label htmlFor="email">Email Address</label>
          </div>
          <div className="input-group">
            <input type="password" name="password" id="password" placeholder="Password" autoComplete="new-password" />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-group">
            <input type="password" name="confirm" id="confirm" placeholder="Confirm" autoComplete="new-password" />
            <label htmlFor="confirm">Confirm Password</label>
          </div>
          <input type="submit" name="Submit" className="is-successful" />
        </form>
      </div>
    );
  }

}

export default UserRegister;