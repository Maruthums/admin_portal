// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DashBoard } from './pages/Dashboard';
import { PhotoList } from './pages/PhotoList';
import { Layout } from './modules/layouts/Layout';
// import {DashBoard} from './pages/index';÷

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/events" element={<PhotoList />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
