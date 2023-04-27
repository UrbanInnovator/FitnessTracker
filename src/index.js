import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './header.js';
import Footer from './footer.js';
import AllRoutines from './routines.js';
import Login from './login.js';
import Home from './home.js';
import Activities from './activities.js';
import MyRoutines from './my_routines.js';




const App = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(window.localStorage.getItem('token'));
  const [userName, setUserName ] = useState()

  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <Routes>
        <Route path='/routines' element={<AllRoutines
        userName={userName}
        isLoggedIn={isLoggedIn}/>}/>
        <Route path='/login'element={<Login
        userName={userName}
        setUserName={setUserName}/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/activities' element={<Activities
        isLoggedIn={isLoggedIn}/>}/>
        <Route path='/my-routines' element={<MyRoutines
        isLoggedIn={isLoggedIn}
        userName={userName}
        setUserName={setUserName}/>}/>
      </Routes>
      <Footer />
    </>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)