import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimneyWindow } from '@fortawesome/free-solid-svg-icons';
import './css/header.css';

const Header = (props) => {

  const Logout =() => {
    localStorage.removeItem('token');
    window.location.replace('/');
  }

  return (
    <>
      <div id='headbox'>
        <header id="topper">
          <h1 id="headline">Fitness Tracker</h1>
          <h4 id="mottoline">Opportunities don't just happen, you create them!</h4>
        </header>
        <div id="navbar">
          <Link to='/' className="navs"><FontAwesomeIcon icon={faHouseChimneyWindow} /></Link>
          <Link to='/routines' className="navs">Routines</Link>
          <Link to='/activities' className="navs">Activities</Link>
          {
            props.isLoggedIn ?
            <>
              <Link to='/my-routines' className="navs">My Routines</Link>
              <button className="navs" onClick={Logout}>Logout</button>
            </>
            : 
            <Link to='/login' className="navs">Login</Link>
          }
        </div>
      </div>
    </>
  )
};

export default Header;