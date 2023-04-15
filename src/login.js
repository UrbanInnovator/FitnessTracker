import React from "react";

const Login = () => { 
  return (
    <div id="logpage">
        {
          props.isLoggedIn ? <p id="logmessage">You're logged in man!</p> : null
        }
        <form onSubmit={handleSubmit}>
          <input id="user" class="userpass" type="text" placeholder="Enter Username" min="5" maxlength="15" name="username" onChange={onChange} required></input>
          <input id="pass" class="userpass" type="password" placeholder="Enter Password" min="8" maxlength="20" name="password" onChange={onChange} required></input>
          {
            showLoginButton ? 
              <>
                <button class="logreg" name="login">Login</button>
                <button class="sublog" onClick={() => setShowLoginButton(false)}>Not Registered? Click Here!</button>
              </> : 
              <>
                <input class="userpass" type="password" placeholder="Confirm Password" name="Confirm Password"></input>
                <button class="logreg" name="register">Register</button>
                <button class="sublog" onClick={() => setShowLoginButton(true)}>Already Registered? Login Here!</button>
              </>
          }
        </form>
      </div>
  )
}

export default Login;