import React, { useState } from 'react';

const WaterTracker = () => {
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');

  // Calculate recommended water intake in litres (1 litre = 1000ml)
  const calculateWaterNeed = () => {
    if (!weight) return null;
    
    const baseMl = weight * 30; // 30ml per kg base
    
    // Activity level adjustments
    const activityMultiplier = {
      'sedentary': 1.0,
      'light': 1.2,
      'moderate': 1.5,
      'active': 1.7,
      'athlete': 2.0
    }[activityLevel];
    
    const totalMl = baseMl * activityMultiplier;
    return (totalMl / 1000).toFixed(2); // Convert to litres
  };

  const recommendedLitres = calculateWaterNeed();

  return (
    <div className="water-tracker">
      <h2>Water Intake Calculator</h2>
      
      <div className="input-section">
        <div className="input-group">
          <label>Your Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
          />
        </div>
        
        <div className="input-group">
          <label>Activity Level:</label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
          >
            <option value="sedentary">Sedentary (little exercise)</option>
            <option value="light">Light activity</option>
            <option value="moderate">Moderate exercise</option>
            <option value="active">Active lifestyle</option>
            <option value="athlete">Athlete/Heavy training</option>
          </select>
        </div>
      </div>
      
      {recommendedLitres && (
        <div className="results-section">
          <div className="recommendation">
            <h3>Recommended Daily Intake</h3>
            <p className="litres">{recommendedLitres} litres</p>
            <p className="equivalent">(~{(recommendedLitres * 1000).toFixed(0)} ml)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterTracker;
