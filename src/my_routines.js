import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/myroutines.css';

const MyRoutines = (props) => {
  const [ myRouties, setMyRouties ] = useState([]);
  const [ upName, setUpName ] = useState([]);
  const [ upGoal, setUpGoal ] = useState([]);
  const [ upPub, setUpPub ] = useState([]);
  const [ newName, setNewName ] = useState([]);
  const [ newGoal, setNewGoal ] = useState([]);
  const [ newPub, setNewPub ] = useState([]);

  useEffect(() => {
    const getMyStuff = async() => {
      try {
        const MyUsername = window.localStorage.getItem('username');
        const response =  await axios.get(`/api/users/${MyUsername}/routines`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.isLoggedIn}`
          }
        });
        setMyRouties(response.data);
        console.log(response.data);
      }catch(error){
        console.log(error);
      }
    }
    getMyStuff();
  }, [])

const newRoutie = async(name, goal, isPublic) => {
  try {
    console.log(props.isLoggedIn);
    const response = await axios.post('/api/routines',
    {  
      name: name,
      goal: goal,
      isPublic: isPublic
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.isLoggedIn}`
      }
    }
    );
    console.log(response.data);
    return response
  }catch(error){
    console.log(error);
  }
}

  const updateRoutie = async(routieId, name, goal, isPublic) => {
    try{
      const response = await axios.patch(`/api/routines/${routieId}`,
      {  
        name: name,
        goal: goal,
        isPublic: isPublic
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.isLoggedIn}`
        }
      }
      );
      console.log("upRES", response.data);
      window.location.reload(false);
      return response.data
    }catch(error){
      console.log(error);
    }
  }

  const newSubmit = (e) => {
    e.preventDefault();

    newRoutie(newName, newGoal, newPub);
  }

  const upSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const pub = form[2].value;
    const routie = form[2].className;

    updateRoutie(routie, upName, upGoal, pub);
  }

  const onChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    console.log(value, "VALUE", e.target, "TARGET");

    if (name === "newname") {
      setNewName(value)
    } else if (name === "newgoal") {
      setNewGoal(value)
    } else if (name === "newpub") {
      setNewPub(value)
    } else if (name === "upname") {
      if(value) setUpName(value);
      else setUpName(null);
    } else if (name === "upgoal") {
      if(value) setUpGoal(value);
      else setUpGoal(null);
   }
    console.log(newName, newGoal, newPub)
  }

  return (
    <div className='routinebox'>
      {
        <form className='routineform' onSubmit={newSubmit}>
          <h3 id="routlabel">New Routine</h3>
          <input type="text" placeholder="New Routine Name..." name="newname" className='routinput' onChange={onChange} required></input>
          <input type="text" placeholder="What's The Goal?" name="newgoal" className='routinput' onChange={onChange} required></input>
          <label for="pubpriv">Public/Private?</label>
          <select id='pubpriv' name='newpub' onChange={onChange} required>
            <option value={true}>Select Routine Privacy</option>
            <option value={true}>Public Routine</option>
            <option value={false}>Private Routine</option>
          </select>
          <button className="butsub" type="submit">Submit</button>
        </form>
      }
      {
        myRouties.map((myRoutie, index) => {
          console.log("routine", myRoutie,"isPub", myRoutie.isPublic,"SELECT");
          return(
            <form id='myroutie' onSubmit={upSubmit} key={index}>
              <input type="text" name="upname" className='routinput' placeholder={myRoutie.name} onChange={onChange} ></input>
              <input type="text" name="upgoal" className='routinput' placeholder={myRoutie.goal} onChange={onChange} ></input>
              <label for="pubpriv">Public/Private?</label>
              <select id='pubpriv' name='uppub' className={myRoutie.id} onChange={onChange}>
                {
                  myRoutie.isPublic === true ?
                  <>
                    <option value={true}>Public Routine</option>
                    <option value={false}>Private Routine</option>                  
                  </>
                  :
                  <>
                    <option value={false}>Private Routine</option>
                    <option value={true}>Public Routine</option>                  
                  </>
                }
              </select>
              <button className="butsub" type="submit">Update</button>         
            </form>
          )
        })
      }
    </div>
  )
}

export default MyRoutines;