import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './header.js';
import Footer from './footer.js';
import AllRoutines from './routines.js';


const App = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(window.localStorage.getItem('token'));

  return (
    <>
      <Header />
      <Routes>
        <Route path='/routines' element={<AllRoutines/>}/>
        <Route path='/' />
        <Route path='/activites' />
        <Route path='/users'/>
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