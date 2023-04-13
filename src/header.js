import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {

  return (
    <>
      <header>
        <h1 id="headline">Fitness Tracker</h1>
        <h4 id="mottoline">"We show you how to be strong - IN THE REAL WAY!"</h4>
      </header>
      <div>
        <Link to='/' className="navs">Home</Link>
        <Link to='/routines' className="navs">Routines</Link>
        <Link to='/activities' className="navs">Activities</Link>
        {/* {
          props.isLoggedIn ?
          <>
            <Link to='/users/:userId/routine' class="navs">My Routines</Link>
          </>
          : null
        } */}
      </div>
    </>
  )
};

export default Header;