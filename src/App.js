import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Gallery from './components/Gallery';
import MapViewer from './components/MapViewer';
import './App.css'; // Make sure this CSS file is imported

function App() {
  return (
    <Router>
      {/* This container is the key to the layout */}
      <div className="app-container">
        <Navbar />
        {/* This main element will hold the page content and fill the remaining space */}
        <main className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Gallery" element={<Gallery />} />
            <Route path="/map" element={<MapViewer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;