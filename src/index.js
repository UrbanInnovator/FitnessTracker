import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import header from './header.js';


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        
      </Routes>
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