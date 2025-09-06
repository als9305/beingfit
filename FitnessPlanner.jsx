// src/components/FitnessPlanner.js
import { useState } from 'react';
import FitnessForm from './FitnessForm';
import FitnessResults from './FitnessResults';

const FitnessPlanner = () => {
  const [userData, setUserData] = useState(() => {
    // Load saved data if exists
    const savedData = localStorage.getItem('fitnessFormData');
    return savedData ? JSON.parse(savedData) : null;
  });

  return (
    <div className="fitness-planner-container">
      <h2>Personalized Fitness Planner</h2>
      {!userData ? (
        <FitnessForm onSubmit={setUserData} />
      ) : (
        <FitnessResults 
          userData={userData} 
          onReset={() => setUserData(null)} 
        />
      )}
    </div>
  );
};

export default FitnessPlanner;