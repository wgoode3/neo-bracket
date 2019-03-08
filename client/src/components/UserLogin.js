import React, { Component } from 'react';
// import axios from 'axios';


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

class UserLogin extends Component {

  render() {
    return (
      <div>
        <form>
          <div className="input-group">
            <input type="text" name="email" id="email" placeholder="Email" autoComplete="email"/>
            <label htmlFor="email">Email Address</label>
          </div>
          <div className="input-group">
            <input type="password" name="password" id="password" placeholder="Password"/>
            <label htmlFor="password">Password</label>
          </div>
          <input type="submit" name="Submit" className="is-successful" />
        </form>
      </div>
    );
  }
  
}

export default UserLogin;