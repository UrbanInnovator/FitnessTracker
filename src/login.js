import React, { useState } from "react";
import Axios from 'axios';
import './css/login.css';

const Login = (props) => { 
  const[logUsername, setLogUsername] = useState('');
  const[logPassword, setLogPassword] = useState('');
  const[showLoginButton, setShowLoginButton] = useState(true)

  const getUser = async() => {
    try {
     const result = await Axios.get('/api/users/login');
     window.localStorage.setItem('token');
     props.setIsLoggedIn(true);
    }catch(error){
     console.log(error);
    }
  }

  const onChangeUsername = (event) => {
    console.log(event.target.value);
    setLogUsername(event.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    console.log(form);

    if(form[3].name === "register") {
      const passConf = form[2].value;
      if(passConf === logPassword) {
        registerUser(logUsername, logPassword);
        console.log(passConf, logUsername, logPassword);
      } else {
        console.log("Passwords do not match");
      }
    } else if (form[2].name === 'login') {
      logIn(logUsername, logPassword);

    }
  };

  const onChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    if(name === 'username') {
      props.setUserN(value);
    } else if (name === 'password') {
      props.setPassW(value);
    }
    // console.log(props.userN, props.passW);
  }

  return (
    <div id="logpage">
        {
          props.isLoggedIn ? <p id="logmessage">You're logged in man!</p> : null
        }
        <form onSubmit={handleSubmit}>
          <input id="user" className="userpass" type="text" placeholder="Enter Username" min="5" maxLength="15" name="username" onChange={onChange} required></input>
          <input id="pass" className="userpass" type="password" placeholder="Enter Password" min="8" maxLength="20" name="password" onChange={onChange} required></input>
          {
            showLoginButton ? 
              <>
                <button className="logreg" name="login">Login</button>
                <button className="sublog" onClick={() => setShowLoginButton(false)}>Not Registered? Click Here!</button>
              </> : 
              <>
                <input className="userpass" type="password" placeholder="Confirm Password" name="Confirm Password"></input>
                <button className="logreg" name="register">Register</button>
                <button className="sublog" onClick={() => setShowLoginButton(true)}>Already Registered? Login Here!</button>
              </>
          }
        </form>
      </div>
  )
}

export default Login;