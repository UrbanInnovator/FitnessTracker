import React from "react";
import { Link } from 'react-router-dom';
import './css/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Home = (props) => {
  return (
    <div id="homediv">
      <img id="homemain" src="https://www.momscleanairforce.org/wp-content/uploads/2020/07/women_exercisefb.jpg"/>
      {
        props.isLoggedIn ?
        <p id="greeting"> Welcome back {props.userName}!</p>
        : <Link to='/login' id="greeting">Join Us!</Link>
      }
      <div id="blurbox">
        <div id="missionstate">
          <h4>Mission Statement</h4>
          <p>Sed rutrum sed enim sed laoreet. Phasellus eu luctus sem, nec viverra diam. Morbi pellentesque libero in ultricies porttitor. Aliquam faucibus, orci ut condimentum auctor, quam augue semper justo, eget fermentum augue ligula vitae ligula. Vivamus a mauris felis. Nunc convallis commodo sem a consectetur. Quisque in magna id nisl blandit placerat.</p>
        </div>
        <div id="demobox">
          <img className="demopic1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZPOgxwgFLD-lqefjvBK1-WlfITMZpBDmrOg&usqp=CAU"/>
          <img className="demopic2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiSEyNYjUm2XsDlUqI6xM0m3Ox_QvX9e_-og&usqp=CAU"/>
        </div>
        <div id="services">
          <h4>What We Provide</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a rhoncus tortor. 
            Sed nec dui urna. Mauris facilisis scelerisque erat ut finibus. Cras fringilla mi ut porta aliquam. 
            Nulla sodales tortor at pretium fringilla. Duis scelerisque tincidunt ipsum, sed congue neque suscipit eu. 
            Maecenas pharetra imperdiet odio non posuere. Sed velit neque, sagittis a felis eget, tincidunt pretium velit. 
            Donec ut dignissim sapien, sed egestas nisi. Pellentesque erat purus, commodo vel mattis et, convallis ut mi. 
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque sagittis fermentum rutrum. 
            In sodales ornare est, pellentesque commodo ex lobortis nec. Etiam vitae justo id sem auctor accumsan. Pellentesque lobortis dapibus commodo. 
            Curabitur pretium tincidunt facilisis.</p>
        </div>
      </div>  
      <h3 id="hypeline">Helping You the Best You!</h3>
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
    </div>
  )
}

export default Home;