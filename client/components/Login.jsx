import React from "react";
import $ from 'jquery';
import SignUp from "./SignUp.jsx";
import Profile from "./Profile.jsx"

class LogIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = { // states used in the mechanism of comparison with the data in the database
      users:[],
      username:"",
      password:"",
      pass:"",
      currentUser : {}
    }
    this.check=this.check.bind(this)
  }
  componentDidMount(){
    $.get("/users").then((results)=>{
      this.setState({
        users:results,
        username: "",
        password: "",
        pass:""
      })
    })
  }
  check(e){
    e.preventDefault();
    const usernameList = this.state.users.map((element)=>
    element.username ) ;
    // console.log(usernameList)
    const passwordList = this.state.users.map((element)=>
    element.password );

    
// The following is the most important part of this component: using a comparison between the input and the saved variables (states) to decide where to go next!    
    if(usernameList.indexOf(this.state.username) === -1){
      //console.log(usernameList.indexOf(this.state.username))
      alert("You should have account first , please sign up")
      this.setState({pass: "signup"})
    }else if(usernameList.indexOf(this.state.username) !== -1 && passwordList[usernameList.indexOf(this.state.username)] !== this.state.password ){ 
      alert("Your password is incorrect")
    }else if(usernameList.indexOf(this.state.username) !== -1 && passwordList[usernameList.indexOf(this.state.username)] === this.state.password ){
      this.setState({pass: "Profile", currentUser: this.state.users[usernameList.indexOf(this.state.username)]})
    } 
  }
  render() {
    if(this.state.pass === ""){
      return (
        <div className=" LoginForm ">
          <form onSubmit={(e)=>this.check(e)}>
            <input
              type="text"
              name="name"
              placeholder="UserName "
              onChange={(e)=>{this.setState({username:e.target.value})}}
            /><br></br>
          
            <input
              type="password"
              name="password"
              placeholder="password "
              onChange={(e)=>{this.setState({password:e.target.value})}}
            /><br></br>
  
            <input type="submit" value="LogIn" onClick ={() => this.props.setCurrentUser(this.state.currentUser)} /><br></br>
          </form>
        </div>
      )
    }else if(this.state.pass === "signup"){
      return (
        <div>
          <SignUp/>
        </div>
      )
    }else if(this.state.pass === "Profile" || !!this.state.currentUser.id){
    return (
      <div>
          <Profile user={this.state.currentUser }/>
      </div>
    )
    }
  }
}

export default LogIn;
