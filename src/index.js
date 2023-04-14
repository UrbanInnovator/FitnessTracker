import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './header.js';
import Footer from './footer.js';
import AllRoutines from './routines.js';
import Login from './login.js';
import Home from './home.js';




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
        <Route path='/login'element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/activites' />
        <Route path='/my-routines' />
      </Routes>
      <Footer />
    </>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <HashRouter>
        <App />
    </HashRouter>
)