import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BMI from './components/BMI';
import Dashboard from './components/Dashboard';
import WaterTracker from './components/WaterTracker';
import NutritionTracker from './components/NutritionTracker';
import FitnessPlanner from './components/FitnessPlanner';
import IndianDietPlanner from './components/IndianDietPlanner';
import MealLog from './components/MealLog';


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bmi" element={<BMI />} />
          <Route path="/water" element={<WaterTracker />} />
          <Route path="/nutrition" element={<NutritionTracker />} />
          <Route path="/meal-log" element={<MealLog />} />
          <Route path="/fitness-planner" element={<FitnessPlanner />} />
          
          <Route path="/indian-diet-planner" element={<IndianDietPlanner />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;