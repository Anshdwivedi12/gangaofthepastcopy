// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHistory, FaMapMarkedAlt, FaHome } from 'react-icons/fa';
import logo from '../assets/logog.svg'; // ✅ Put your logo in src/assets/logo.png (adjust path as needed)

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* ✅ Logo + Text section */}
                <NavLink to="/" className="logo-section">
                    <img 
                        src={logo} 
                        alt="Logo" 
                        className="logo-img"
                        style={{ height: "75px", marginRight: "10px", marginTop: "-6px"}} // inline style (or use CSS class)
                    />
                    <div className="logo-text">
                        <strong>Ganga of the past</strong>
                        <span>Explore the heritage of the Ganga with Geospatial Gallery</span>
                    </div>
                </NavLink>

                {/* ✅ Navigation Links */}
                <div className="nav-links">
                    <NavLink
                        to="/"
                        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                    >
                        <FaHome className="nav-icon" />
                        <span>Home</span>
                    </NavLink>

                    <NavLink
                        to="/Gallery"
                        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                    >
                        <FaHistory className="nav-icon" />
                        <span>Historical Gallery</span>
                    </NavLink>

                    <NavLink
                        to="/map"
                        className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                    >
                        <FaMapMarkedAlt className="nav-icon" />
                        <span>About</span>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
