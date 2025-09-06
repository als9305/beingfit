// src/components/NutritionTracker.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './NutritionTracker.css';

const NutritionTracker = () => {
  const NUTRITIONIX_ID = '18a45e49';
  const NUTRITIONIX_KEY = '4f1a8581e64caf4c6fb6a7fd8dee4709';

  const [foodInput, setFoodInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchFood = async () => {
    if (!foodInput.trim()) {
      setError('Please enter a food item');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/nutrients',
        { query: foodInput },
        {
          headers: {
            'x-app-id': NUTRITIONIX_ID,
            'x-app-key': NUTRITIONIX_KEY,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.foods.length === 0) {
        setError('No nutrition data found');
        return;
      }

      const foodData = response.data.foods[0];
      setResult({
        name: foodData.food_name,
        calories: foodData.nf_calories,
        protein: foodData.nf_protein,
        carbs: foodData.nf_total_carbohydrate,
        fat: foodData.nf_total_fat,
        serving: foodData.serving_qty + ' ' + foodData.serving_unit
      });

    } catch (err) {
      setError('Failed to fetch data. Try simpler terms like "1 banana"');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nutrition-tracker">
      <h2>Nutrition Tracker</h2>
      
      <div className="search-box">
        <input
          type="text"
          value={foodInput}
          onChange={(e) => setFoodInput(e.target.value)}
          placeholder="e.g., 1 banana, 200g chicken"
        />
        <button onClick={searchFood} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <h3>{result.name}</h3>
          <p>Serving: {result.serving}</p>
          <div className="nutrients">
            <div><span>Calories:</span> {Math.round(result.calories)}</div>
            <div><span>Protein:</span> {Math.round(result.protein)}g</div>
            <div><span>Carbs:</span> {Math.round(result.carbs)}g</div>
            <div><span>Fat:</span> {Math.round(result.fat)}g</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionTracker;