import React, { useState } from "react";
import Axios from 'axios';
import './css/login.css';

const Login = (props) => { 
  const[logUsername, setLogUsername] = useState('');
  const[logPassword, setLogPassword] = useState('');
  const[showLoginButton, setShowLoginButton] = useState(true)

  const getUser = async(username, password) => {
    try {
     const result = await Axios.post('/api/users/login',
     {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      user: {
        username: username,
        password: password
      }
    }
    );
     window.localStorage.setItem('token', `${result.data.token}`);
     window.localStorage.setItem('username', `${result.data.user.username}`);
     window.location.replace('/');
    }catch(error){
     console.log(error);
    }
  }

  const registerUser = async (username, password) => {
   try {
    const result = await Axios.post('/api/users/register',
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
       
        username: username,
        password: password
      
    }
    );
    return result
   } catch(error) {
    console.log(error);
   }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if(form[3].name === "register") {
      const passConf = form[2].value;
      if(passConf === logPassword) {
        registerUser(logUsername, logPassword);
      } else {
        console.log("Passwords do not match");
      }
    } else if (form[2].name === 'login') {
      getUser(logUsername, logPassword);
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    if(name === 'username') {
      setLogUsername(value);
    } else if (name === 'password') {
      setLogPassword(value);
    }
    // console.log(props.userN, props.passW);
  }

  return (
    <div id="logpage">
        {
          props.isLoggedIn ? <p id="logmessage">You're logged in man!</p> : null
        }
        <form id="loginform" onSubmit={handleSubmit}>
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