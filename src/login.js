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

  const onChangePassword =(event) => {
    console.log(event.target.value);
    setLogPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div id="logpage">
        {
          props.isLoggedIn ? <p id="logmessage">You're logged in man!</p> : null
        }
        <form onSubmit={handleSubmit}>
          <input id="user" className="username" type="text" placeholder="Enter Username" min="5" maxLength="15" name="username" onChange={onChangeUsername} required></input>
          <input id="pass" className="userpass" type="password" placeholder="Enter Password" min="8" maxLength="20" name="password" onChange={onChangePassword} required></input>
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