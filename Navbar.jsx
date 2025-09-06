import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-brand">
      <h1>BEING FIT</h1>
    </div>
    <div className="navbar-links">
      <Link to="/" className="nav-link">Dashboard</Link>
      <Link to="/bmi" className="nav-link">BMI</Link>
      <Link to="/meal-log" className="nav-link">Meal Log</Link>
      <Link to="/fitness-planner" className="nav-link">Fitness Planner</Link>
      <Link to="/water" className="nav-link">Water</Link>
      <Link to="/nutrition" className="nav-link">Nutrition Tracker</Link>
      <Link to="/indian-diet-planner" className="nav-link"> Diet Planner</Link>
      
    </div>
  </nav>
);

export default Navbar;