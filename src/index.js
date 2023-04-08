import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <header>
        <h1>FITNESS! I WANNA SHOW YOU HOW TO BE STRONG IN THE REAL WAY</h1>
      </header>
      <div>
        Why do you have to look up to her??!!
      </div>

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