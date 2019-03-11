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

class UserRegister extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: {
        "first_name": "",
        "last_name": "",
        "location": "",
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
      axios.post("/api/users", this.state.user).then( res => {
        if(res.data.errors){
          this.setState({errors: res.data.errors});
        }else{
          localStorage.setItem("user_id", res.data.user_id);
          this.props.onRegister();
          this.props.history.push("/bracket");
        }
      }).catch(err => {
        console.log("something went wrong", err);
      });
    });
  }

  render() {
    return (
      <div className="form-blob">
        <h2 className="form-header">Make an account</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="row">  
            <div className={"input-group col-s-6" + (this.state.errors.first_name ? " error": "")}>
              <p className="validation">
                {
                  (this.state.errors.first_name) ? 
                  <span>{this.state.errors.first_name}</span> : 
                  <span></span>
                }
              </p>
              <input type="text" name="first_name" id="first_name" placeholder="First name" autoComplete="first_name" />
              <label htmlFor="first_name">First name</label>
            </div>
            <div className={"input-group col-s-6" + (this.state.errors.last_name ? " error": "")}>
              <p className="validation">
                {
                  (this.state.errors.last_name) ? 
                  <span>{this.state.errors.last_name}</span> : 
                  <span></span>
                }
              </p>
              <input type="text" name="last_name" id="last_name" placeholder="Last name" autoComplete="last_name" />
              <label htmlFor="last_name">Last name</label>
            </div>
            <div className="select-group col-s-6">
              <p>{/* p tag for spacing purposes only */}</p> 
              <select name="location" id="location">
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
                <option>Other</option>
                <option>Online</option>
              </select>
              <label htmlFor="location">Location</label>
            </div>
            <div className={"input-group col-s-6" + (this.state.errors.email ? " error": "")}>
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
            <div className={"input-group col-s-6" + (this.state.errors.password ? " error": "")}>
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
            <div className={"input-group col-s-6" + (this.state.errors.confirm ? " error": "")}>
              <p className="validation">
                {
                  (this.state.errors.confirm) ? 
                  <span>{this.state.errors.confirm}</span> : 
                  <span></span>
                }
              </p>
              <input type="password" name="confirm" id="confirm" placeholder="Confirm" autoComplete="new-password" />
              <label htmlFor="confirm">Confirm Password</label>
            </div>
          </div>
          <input type="submit" name="Submit" className="is-primary is-larger" value="Sign up" />
          <Link to="/sign_in" className="form-link">I already have an account</Link>
        </form>
      </div>
    );
  }

}

export default UserRegister;