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
        routines.map((routine, index) => {
          return (
            <div className='routine' key={index}>
              <h3 className='main'>{routine.name}</h3>
              <h4 className='details'> ID:{routine.id} | Made By:{routine.creatorName}</h4>
              <p className='main'>{routine.goal}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default AllRoutines;