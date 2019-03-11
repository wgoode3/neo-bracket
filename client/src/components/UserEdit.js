import React, { Component } from 'react';
import axios from 'axios';


function valid_filetype(filename) {
  const allowed_extensions = [".jpg", ".jpeg", ".png", ".gif"];
  let valid = false;
  for(let extension of allowed_extensions) {
    if(filename.endsWith(extension)){
      valid = true;
    }
  }
  return valid;
}

class UserEdit extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      file_name: "",
      image: "",
      errors: {},
      file_error: ""
    }
  }

  componentDidMount = () => {
    let user_id = localStorage.getItem("user_id");
    axios.get(`/api/users/${user_id}`).then( res => {
      let user = {
        _id: res.data.user._id,
        first_name: res.data.user.first_name,
        last_name: res.data.user.last_name,
        location: res.data.user.location,
        email: res.data.user.email,
        avatar: res.data.user.avatar
      }
      this.setState({user: user});
    }).catch( err => {
      console.log("something went wrong", err);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let user_id = localStorage.getItem("user_id");
    let data = {...this.state.user};
    data.file_name = this.state.file_name;
    data.image = this.state.image;
    axios.put(`/api/users/${user_id}`, data).then( res => {
      if(res.data.errors){
        this.setState({errors: res.data.errors});
      } else {
        this.props.onUpdate();
      }
    }).catch( err => {
      console.log("something went wrong", err);
    });
  }

  handleChange = (e) => {
    let u = {...this.state.user}
    u[e.target.name] = e.target.value;
    this.setState({user: u});
  }

  imageUpload = (e) => {
    let file = e.target.files[0];
    // ugly validations here
    if(!valid_filetype(file.name)) {
      this.setState({file_error: "Image must be jpg, png, or gif"});
      return;
    } else if(file.size > 1048576) {
      this.setState({file_error: "Image must be less than 1MB"});
      return;
    } else {
      this.setState({file_error: ""});
    }
    let reader = new FileReader();
    let avatar = document.getElementById("avatar");
    reader.addEventListener("load", () => {
      avatar.src = reader.result;
      this.setState({file_name: file.name, image: reader.result});
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    return (
      <div className="form-blob">
        <h2 className="form-header">Update your account</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="row col-s-4">
              <label className="img-upload">
                <img className="avatar" src={"/media/" + this.state.user.avatar} alt="avatar" id="avatar" />
                <input type="file" name="img" onChange={this.imageUpload} />
                <p className="img-upload-label">click to change</p>
              </label>
              <p className="file-error">{this.state.file_error}</p>
            </div>
            <div className="row col-s-8">  
              <div className={"input-group col-s-6" + (this.state.errors.first_name ? " error": "")}>
                <p className="validation">
                  {
                    (this.state.errors.first_name) ? 
                    <span>{this.state.errors.first_name}</span> : 
                    <span></span>
                  }
                </p>
                <input type="text" name="first_name" id="first_name" placeholder="First name" value={this.state.user.first_name} onChange={this.handleChange}/>
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
                <input type="text" name="last_name" id="last_name" placeholder="Last name" value={this.state.user.last_name} onChange={this.handleChange} />
                <label htmlFor="last_name">Last name</label>
              </div>
              <div className="select-group col-s-12">
                <p>&nbsp;{/* p tag for spacing purposes only */}</p> 
                <select name="location" id="location" value={this.state.user.location} onChange={this.handleChange} >
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
              <div className={"input-group col-s-12" + (this.state.errors.email ? " error": "")}>
                <p className="validation">
                  {
                    (this.state.errors.email) ? 
                    <span>{this.state.errors.email}</span> : 
                    <span></span>
                  }
                </p>
                <input type="text" name="email" id="email" placeholder="Email" value={this.state.user.email} onChange={this.handleChange} />
                <label htmlFor="email">Email Address</label>
              </div>
            </div>
          </div>
          <input type="submit" name="Submit" className="is-primary is-larger" value="Update" />
        </form>
      </div>
    );
  }
  
}

export default UserEdit;