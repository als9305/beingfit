// src/components/BMI.jsx
import React, { useState } from 'react';
import { saveToStorage, STORAGE_KEYS } from '../services/localStorageService';

const BMI = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [result, setResult] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    
    if (!weight || !height || !age) {
      alert('Please fill all required fields');
      return;
    }

    const h = height / 100;
    const bmi = (weight / (h * h)).toFixed(2);
    let category = '';
    
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 24.9) category = 'Normal weight';
    else if (bmi < 29.9) category = 'Overweight';
    else category = 'Obese';

    // Calculate BMR (Basal Metabolic Rate)
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity level multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const maintenanceCalories = Math.round(bmr * activityMultipliers[activityLevel]);
    const fatLossCalories = Math.round(maintenanceCalories * 0.85); // 15% deficit
    const muscleGainCalories = Math.round(maintenanceCalories * 1.15); // 15% surplus

    setResult({
      bmi,
      category,
      maintenanceCalories,
      fatLossCalories,
      muscleGainCalories
    });

    // Save to localStorage
    const newEntry = {
      date: new Date().toLocaleDateString(),
      bmi,
      category,
      weight,
      height,
      calories: maintenanceCalories
    };
    
    saveToStorage(STORAGE_KEYS.BMI_HISTORY, [newEntry]); // Only save the latest entry, no history.
  };

  return (
    <div className="bmi-container">
      <h2>BMI Calculator</h2>
      <form onSubmit={calculateBMI}>
        <div className="input-group">
          <div className="input-row">
            <label>Weight (kg)</label>
            <input 
              type="number" 
              value={weight} 
              onChange={e => setWeight(e.target.value)}
              required
            />
          </div>
          
          <div className="input-row">
            <label>Height (cm)</label>
            <input 
              type="number" 
              value={height} 
              onChange={e => setHeight(e.target.value)}
              required
            />
          </div>
          
          <div className="input-row">
            <label>Age</label>
            <input 
              type="number" 
              value={age} 
              onChange={e => setAge(e.target.value)}
              required
            />
          </div>
          
          <div className="input-row">
            <label>Gender</label>
            <select value={gender} onChange={e => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          
          <div className="input-row">
            <label>Activity Level</label>
            <select value={activityLevel} onChange={e => setActivityLevel(e.target.value)}>
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Light (exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (exercise 3-5 days/week)</option>
              <option value="active">Active (exercise 6-7 days/week)</option>
              <option value="veryActive">Very Active (hard exercise & physical job)</option>
            </select>
          </div>
          
          <button type="submit">Calculate</button>
        </div>
      </form>
      
      {result && (
        <div className="result-box">
          <h3>Your Results</h3>
          <p><strong>BMI:</strong> {result.bmi} ({result.category})</p>
          
          <div className="calorie-results">
            <div className="calorie-box">
              <h4>Maintenance</h4>
              <p>{result.maintenanceCalories} kcal/day</p>
            </div>
            <div className="calorie-box">
              <h4>Fat Loss</h4>
              <p>{result.fatLossCalories} kcal/day</p>
            </div>
            <div className="calorie-box">
              <h4>Muscle Gain</h4>
              <p>{result.muscleGainCalories} kcal/day</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMI;
