import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './css/activities.css';


const AllActivities = (props) => {
const [activities, setActivities] = useState([]);
const [newActivityName, setNewActivityName] = useState('');
const [newDescriptionName, setNewDescriptionName] = useState('');

useEffect(() => {
  const seeActivities = async() => {
    try{
     const response = await Axios.get('/api/activities')
     
     setActivities(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  seeActivities();
  console.log("ACTIVITIES", activities);
}, [])

const addActivity = async(name, description) => {
  try {
    const response = await Axios.post('/api/activities',
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.isLoggedIn}`
      },
       
        name: name,
        description: description
      
    }
    );
    console.log("RESPONSE", response);
    window.location.replace('/');
    return response;
  }catch (err) {
   console.log(err);
  }
}
const handleSubmit = (e) => {
  e.preventDefault();
 addActivity(newActivityName, newDescriptionName);
};


const onChange = (e) => {
  e.preventDefault();
  const name = e.target.name;
  const value = e.target.value;

  if(name === 'activity') {
    setNewActivityName(value);
  } else if (name === 'description') {
    setNewDescriptionName(value);
  }
  console.log(name, value);
}

 return (
  <div id="activitybox">
  {
      props.isLoggedIn ?
  <form id="createact" onSubmit={handleSubmit}>
    <h3 id="actlabel">New Activity</h3>
    <input id="newactname" className="actinput" type="text" placeholder="New Activity Name" name="activity" onChange={onChange} required></input>
    <input id="newactdescription" className="actinput" type="text" placeholder="Describe Your Activity" name="description"onChange={onChange} required></input>
    <button className="subact" type="submit" >Sumbit</button>
  </form>  : null
}
  
  { 
    activities ?
    activities.map((activity, index) => {
      return(
        <ul className="activityform" key={index}>
          <h3 className="mainact">Activity: {activity.name}</h3>
          <li className="actname">Name: {activity.name}</li>
          <li className="duration">Duration: {activity.duration} Count: {activity.count}</li>
          <li className="description">Description; {activity.description}</li>
        </ul>
      )
    }) : <div>No Activities yet! Be the first to add one!</div>
    
    }
    
  </div>
  


  
  
 )
}

export default AllActivities