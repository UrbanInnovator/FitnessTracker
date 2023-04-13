import React, { useState, useEffect } from 'react';
import Axios from 'axios';

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
    <div>
      {
        routines.map((routine, index) => {
          return (
            <div className="routine" key={index}>
              <h3>{routine.name}</h3>
            </div>
          )
        })
      }
    </div>
  )
}

export default AllRoutines;