import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

class UserLogin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: {
        "email": "",
        "password": ""
      },
      errors: {}
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({login: serialize(e.target)}, () => {
      axios.post("/api/session", this.state.login).then( res => {
        if(res.data.errors){
          this.setState({errors: res.data.errors});
        }else{
          localStorage.setItem("user_id", res.data.user._id);
          this.props.onLogin();
          this.props.history.push("/");
        }
      }).catch(err => {
        console.log("something went wrong", err);
      });
    });
  }

  render() {
    return (
      <div className="form-blob">
        <h2 className="form-header">Log in to your account</h2>
        <form onSubmit={this.handleSubmit}>
          <div className={"input-group" + (this.state.errors.email ? " error": "")}>
            <p className="validation">
              {
                (this.state.errors.email) ? 
                <span>{this.state.errors.email}</span> : 
                <span></span>
              }
            </p>
            <input type="text" name="email" id="email" placeholder="Email" autoComplete="email" />
            <label htmlFor="email">Email Address</label>
          </div>
          <div className={"input-group" + (this.state.errors.password ? " error": "")}>
            <p className="validation">
              {
                (this.state.errors.password) ? 
                <span>{this.state.errors.password}</span> : 
                <span></span>
              }
            </p>
            <input type="password" name="password" id="password" placeholder="Password" autoComplete="new-password" />
            <label htmlFor="password">Password</label>
          </div>
          <input type="submit" name="Submit" className="is-primary is-larger" value="Sign In" />
          <Link to="/sign_up" className="form-link">Create an account</Link>
        </form>
      </div>
    );
  }
  
}

export default UserLogin;