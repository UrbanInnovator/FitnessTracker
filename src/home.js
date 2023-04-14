import React from "react";
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <div id="homediv">
      <img id="homemain" src="homepic1" />
      {
        props.isLoggedIn ?
        <p id="greeting"> Welcome back {props.userName}!</p>
        : <Link to='/login' id="greeting">Join Us!</Link>
      }
      <div id="blurbox">
        <div id="missionstate">
          <h4>Mission Statement</h4>
          <p></p>
        </div>
        <div id="demobox">
          <img className="demopics" src="homepic2"/>
          <img className="demnopics" src="homepics3"/>
        </div>
        <div id="services">
          <h4>What We Provide</h4>
          <p></p>
        </div>
        <h3 id="hypeline">Helping You the Best You!</h3>
        <div id="reviews">
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  )
}

export default Home;