import React, { useState, useEffect } from 'react';
import './IndianDietPlanner.css';

const IndianDietPlanner = () => {
  const [dietType, setDietType] = useState('veg');
  const [goal, setGoal] = useState('fatloss');
  const [calories, setCalories] = useState(1800);

  // Complete Indian meal plans
  const indianMealPlans = {
    veg: {
      fatloss: {
        breakfast: {
          name: "2 Besan chilla + Mint chutney",
          time: "8:00 AM",
          calories: 280,
          protein: 14,
          carbs: 30,
          fat: 8,
          fiber: 6
        },
        midMorning: {
          name: "Sprouts salad + Lemon juice",
          time: "11:00 AM",
          calories: 150,
          protein: 8,
          carbs: 20,
          fat: 2,
          fiber: 7
        },
        lunch: {
          name: "2 Roti + Dal + Bhindi sabzi + Curd",
          time: "1:30 PM",
          calories: 450,
          protein: 18,
          carbs: 60,
          fat: 10,
          fiber: 12
        },
        evening: {
          name: "Green tea + Roasted chana",
          time: "4:30 PM",
          calories: 100,
          protein: 5,
          carbs: 15,
          fat: 2,
          fiber: 4
        },
        dinner: {
          name: "Jowar roti + Lauki chana dal",
          time: "7:30 PM",
          calories: 400,
          protein: 16,
          carbs: 50,
          fat: 8,
          fiber: 10
        },
        postDinner: {
          name: "Turmeric milk (less sugar)",
          time: "9:30 PM",
          calories: 120,
          protein: 4,
          carbs: 10,
          fat: 5,
          fiber: 0
        }
      },
      musclegain: {
        breakfast: {
          name: "Paneer bhurji + 3 Multigrain toast",
          time: "8:00 AM",
          calories: 450,
          protein: 25,
          carbs: 45,
          fat: 15,
          fiber: 8
        },
        midMorning: {
          name: "Banana peanut butter smoothie",
          time: "11:00 AM",
          calories: 300,
          protein: 12,
          carbs: 35,
          fat: 12,
          fiber: 5
        },
        lunch: {
          name: "2 Roti + Rajma + Paneer sabzi + Curd",
          time: "1:30 PM",
          calories: 650,
          protein: 30,
          carbs: 70,
          fat: 18,
          fiber: 15
        },
        evening: {
          name: "Makhana + Almonds + Milk",
          time: "4:30 PM",
          calories: 250,
          protein: 10,
          carbs: 20,
          fat: 12,
          fiber: 3
        },
        dinner: {
          name: "Brown rice + Soya chunk curry + Salad",
          time: "7:30 PM",
          calories: 550,
          protein: 35,
          carbs: 60,
          fat: 12,
          fiber: 10
        },
        postDinner: {
          name: "Whey protein shake",
          time: "9:30 PM",
          calories: 200,
          protein: 24,
          carbs: 10,
          fat: 5,
          fiber: 2
        }
      }
    },
    nonveg: {
      fatloss: {
        breakfast: {
          name: "Egg whites bhurji + 1 Multigrain toast",
          time: "8:00 AM",
          calories: 250,
          protein: 20,
          carbs: 20,
          fat: 6,
          fiber: 4
        },
        midMorning: {
          name: "Buttermilk + Handful peanuts",
          time: "11:00 AM",
          calories: 150,
          protein: 7,
          carbs: 10,
          fat: 8,
          fiber: 3
        },
        lunch: {
          name: "1 Roti + Grilled chicken + Dal + Salad",
          time: "1:30 PM",
          calories: 500,
          protein: 40,
          carbs: 35,
          fat: 12,
          fiber: 8
        },
        evening: {
          name: "Black coffee + Boiled egg",
          time: "4:30 PM",
          calories: 80,
          protein: 6,
          carbs: 1,
          fat: 5,
          fiber: 0
        },
        dinner: {
          name: "Fish curry + Quinoa rice + Stir-fry veggies",
          time: "7:30 PM",
          calories: 450,
          protein: 35,
          carbs: 40,
          fat: 10,
          fiber: 8
        },
        postDinner: {
          name: "Cinnamon tea",
          time: "9:30 PM",
          calories: 5,
          protein: 0,
          carbs: 1,
          fat: 0,
          fiber: 0
        }
      },
      musclegain: {
        breakfast: {
          name: "6 Egg omelette + 3 Bread toast + Avocado",
          time: "8:00 AM",
          calories: 600,
          protein: 35,
          carbs: 45,
          fat: 25,
          fiber: 8
        },
        midMorning: {
          name: "Whey protein + Banana + Peanut butter",
          time: "11:00 AM",
          calories: 350,
          protein: 30,
          carbs: 35,
          fat: 10,
          fiber: 4
        },
        lunch: {
          name: "2 Roti + Chicken curry + Dal + Paneer + Curd",
          time: "1:30 PM",
          calories: 800,
          protein: 65,
          carbs: 60,
          fat: 25,
          fiber: 12
        },
        evening: {
          name: "Poha with peanuts + Milk",
          time: "4:30 PM",
          calories: 300,
          protein: 12,
          carbs: 45,
          fat: 8,
          fiber: 4
        },
        dinner: {
          name: "Brown rice + Mutton curry + Salad",
          time: "7:30 PM",
          calories: 700,
          protein: 50,
          carbs: 65,
          fat: 20,
          fiber: 10
        },
        postDinner: {
          name: "Greek yogurt + Chiaseeds",
          time: "9:30 PM",
          calories: 200,
          protein: 18,
          carbs: 5,
          fat: 12,
          fiber: 3
        }
      }
    }
  };

  // Calculate total nutrition
  const [totalNutrition, setTotalNutrition] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0
  });

  useEffect(() => {
    const currentPlan = indianMealPlans[dietType][goal];
    let totals = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };

    for (const meal in currentPlan) {
      totals.calories += currentPlan[meal].calories;
      totals.protein += currentPlan[meal].protein;
      totals.carbs += currentPlan[meal].carbs;
      totals.fat += currentPlan[meal].fat;
      totals.fiber += currentPlan[meal].fiber;
    }

    setTotalNutrition(totals);
  }, [dietType, goal]);

  const handleDietTypeChange = (type) => {
    setDietType(type);
  };

  const handleGoalChange = (newGoal) => {
    setGoal(newGoal);
    setCalories(newGoal === 'fatloss' ? 1800 : 2500);
  };

  const handleCalorieChange = (e) => {
    setCalories(parseInt(e.target.value));
  };

  return (
    <div className="diet-planner">
      <h2>Indian Diet Planner</h2>
      
      <div className="controls">
        <div className="option-group">
          <h3>Diet Type</h3>
          <div className="buttons">
            <button 
              className={`diet-btn ${dietType === 'veg' ? 'active' : ''}`}
              onClick={() => handleDietTypeChange('veg')}
            >
              Vegetarian
            </button>
            <button 
              className={`diet-btn ${dietType === 'nonveg' ? 'active' : ''}`}
              onClick={() => handleDietTypeChange('nonveg')}
            >
              Non-Vegetarian
            </button>
          </div>
        </div>
        
        <div className="option-group">
          <h3>Goal</h3>
          <div className="buttons">
            <button 
              className={`goal-btn ${goal === 'fatloss' ? 'active' : ''}`}
              onClick={() => handleGoalChange('fatloss')}
            >
              Fat Loss
            </button>
            <button 
              className={`goal-btn ${goal === 'musclegain' ? 'active' : ''}`}
              onClick={() => handleGoalChange('musclegain')}
            >
              Muscle Gain
            </button>
          </div>
        </div>
      </div>
      
      <div className="meal-plan">
        {Object.entries(indianMealPlans[dietType][goal]).map(([mealTime, meal]) => (
          <div key={mealTime} className="meal-card">
            <div className="meal-time">{meal.time}</div>
            <h3 className="meal-name">{meal.name}</h3>
            <div className="nutrition-facts">
              <div className="nutrition-item">
                <span className="nutrition-value">{meal.calories}</span>
                <span className="nutrition-label">Calories</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-value">{meal.protein}g</span>
                <span className="nutrition-label">Protein</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-value">{meal.carbs}g</span>
                <span className="nutrition-label">Carbs</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-value">{meal.fat}g</span>
                <span className="nutrition-label">Fat</span>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-value">{meal.fiber}g</span>
                <span className="nutrition-label">Fiber</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="nutrition-summary">
        <h3>Daily Totals</h3>
        <div className="total-nutrition">
          <div className="total-item">
            <span className="total-value">{totalNutrition.calories}</span>
            <span className="total-label">Calories</span>
          </div>
          <div className="total-item">
            <span className="total-value">{totalNutrition.protein}g</span>
            <span className="total-label">Protein</span>
          </div>
          <div className="total-item">
            <span className="total-value">{totalNutrition.carbs}g</span>
            <span className="total-label">Carbs</span>
          </div>
          <div className="total-item">
            <span className="total-value">{totalNutrition.fat}g</span>
            <span className="total-label">Fat</span>
          </div>
          <div className="total-item">
            <span className="total-value">{totalNutrition.fiber}g</span>
            <span className="total-label">Fiber</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndianDietPlanner;