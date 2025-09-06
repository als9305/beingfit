import React, { useEffect, useState } from 'react';
import { getFromStorage, saveToStorage } from '../services/localStorageService';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [meals, setMeals] = useState([]);
  const [totalNutrition, setTotalNutrition] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  // Fetch meals on mount
  useEffect(() => {
    const savedMeals = getFromStorage('aleraFitness_mealHistory', []);
    setMeals(savedMeals);
    calculateTotalNutrition(savedMeals);
  }, []);

  // Calculate total nutrition
  const calculateTotalNutrition = (meals) => {
    const nutrition = meals.reduce(
      (acc, meal) => {
        acc.calories += meal.calories;
        acc.protein += meal.protein;
        acc.carbs += meal.carbs;
        acc.fat += meal.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, }
    );
    setTotalNutrition(nutrition);
  };

  // Delete meal handler
  const handleDeleteMeal = (indexToDelete) => {
    const updatedMeals = meals.filter((_, index) => index !== indexToDelete);
    setMeals(updatedMeals);
    saveToStorage('aleraFitness_mealHistory', updatedMeals);
    calculateTotalNutrition(updatedMeals);
  };

  const chartData = {
    labels: ['Calories', 'Protein', 'Carbs', 'Fat',],
    datasets: [
      {
        label: 'Nutritional Breakdown',
        data: [
          totalNutrition.calories,
          totalNutrition.protein,
          totalNutrition.carbs,
          totalNutrition.fat,
        ],
        backgroundColor: [
          '#ffcc00', // Calories
          '#08519C', // Protein
          '#33cc33', // Carbs
          '#f44336', // Fat
          '#6a5acd', // Fiber
        ],
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="dashboard-stats">
        <h3>Total Nutrition</h3>
        <div><strong>Calories:</strong> {Math.round(totalNutrition.calories)} kcal</div>
        <div><strong>Protein:</strong> {Math.round(totalNutrition.protein)}g</div>
        <div><strong>Carbs:</strong> {Math.round(totalNutrition.carbs)}g</div>
        <div><strong>Fat:</strong> {Math.round(totalNutrition.fat)}g</div>
      </div>

      <div className="chart-container">
        <h3>Nutritional Breakdown</h3>
        <Pie data={chartData} />
      </div>

      <div className="meal-list">
        <h3>Logged Meals</h3>
        {meals.length > 0 ? (
          <ul>
            {meals.map((meal, index) => (
              <li key={index}>
                <h4>{meal.name}</h4>
                <p>Serving: {meal.serving}</p>
                <div className="nutrients">
                  <div><span>Calories:</span> {Math.round(meal.calories)}</div>
                  <div><span>Protein:</span> {Math.round(meal.protein)}g</div>
                  <div><span>Carbs:</span> {Math.round(meal.carbs)}g</div>
                  <div><span>Fat:</span> {Math.round(meal.fat)}g</div>
                 
                </div>
                <button className="delete-btn" onClick={() => handleDeleteMeal(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No meals logged yet. Start logging meals!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
