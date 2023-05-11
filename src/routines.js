import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './css/routines.css';

const AllRoutines = () => {
  const [routines, setRoutines] = useState([]);


  useEffect(() => {
    const getPublicRoutines = async() => {
      try {
        const response = await Axios.get('/api/routines');
        setRoutines(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPublicRoutines();
  }, [])

  console.log("ROUTINES", routines);

  return(
    <div id='routinebox'>
      {
        routines ?
        routines.map((routine, index) => {
          let activities = routine.activities;
          return (
            <div className='routine' key={index}>
              <h3 className='main'>Routine: {routine.name}</h3>
              <h4 className='details'> ID:{routine.id} | Made By:{routine.creatorName}</h4>
              <p className='main'>Goal: {routine.goal}</p>
                {
                  activities.map((activity, index) => {
                    return(
                      <ul className="activity" key={index}>
                        <h3 className='main'>Activity: {activity.name}</h3>
                        <li className='actname'>Name: {activity.name}</li>
                        <li className='duration'>Duration: {activity.duration} Count: {activity.count}</li>
                        <li className='desription'>Description: {activity.description}</li>
                      </ul>
                    )
                  })
                }
            </div>
          )
        }) : <div>No Routines yet! Be the first to add one!</div>
      }
    </div>
  )
}

export default AllRoutines;