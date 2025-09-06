import React from 'react';
import './FitnessResults.css';

const FitnessResults = ({ userData, onReset }) => {
  // Enhanced health metrics calculation
  const calculateMetrics = () => {
    const heightInM = userData.height / 100;
    const bmi = (userData.weight / (heightInM * heightInM)).toFixed(1);
    
    // More accurate BMR calculation (Mifflin-St Jeor Equation)
    let bmr;
    if (userData.gender === 'male') {
      bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5;
    } else {
      bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age - 161;
    }

    // Enhanced activity level factors
    const activityFactors = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extreme: 1.9
    };
    const tdee = bmr * activityFactors[userData.activityLevel];

    // Calculate ideal weight range
    const idealWeightMin = Math.round(18.5 * heightInM * heightInM);
    const idealWeightMax = Math.round(24.9 * heightInM * heightInM);

    return { 
      bmi, 
      tdee: Math.round(tdee),
      idealWeightMin,
      idealWeightMax,
      bmr: Math.round(bmr)
    };
  };

  const { bmi, tdee, idealWeightMin, idealWeightMax, bmr } = calculateMetrics();

  // Enhanced workout plan generator
  const getWorkoutPlan = () => {
    const basePlans = {
      'fat-loss': {
        focus: "High-intensity interval training (HIIT) and metabolic conditioning",
        frequency: "5-6 days/week",
        intensity: "High",
        split: [
          "Day 1: Full body HIIT (30-45 mins)",
          "Day 2: Upper body strength + cardio finisher",
          "Day 3: Active recovery (yoga/stretching)",
          "Day 4: Lower body circuit training",
          "Day 5: Metabolic conditioning (AMRAP/EMOM)",
          "Day 6: Moderate cardio (45-60 mins)"
        ],
        tips: [
          "Focus on compound movements to maximize calorie burn",
          "Keep rest periods short (30-60 seconds)",
          "Incorporate supersets to maintain intensity"
        ]
      },
      'muscle-gain': {
        focus: "Progressive overload with hypertrophy focus",
        frequency: "4-5 days/week",
        intensity: "Moderate-High",
        split: [
          "Day 1: Chest & Triceps (4-5 exercises each)",
          "Day 2: Back & Biceps (4-5 exercises each)",
          "Day 3: Active recovery (mobility work)",
          "Day 4: Legs (quad/hamstring focus)",
          "Day 5: Shoulders & Arms (3-4 exercises each)",
          "Day 6: Rest or light cardio"
        ],
        tips: [
          "Aim for 3-4 sets of 8-12 reps per exercise",
          "Increase weight gradually each week",
          "Focus on mind-muscle connection"
        ]
      },
      'maintenance': {
        focus: "Balanced strength and cardiovascular health",
        frequency: "4-5 days/week",
        intensity: "Moderate",
        split: [
          "Day 1: Full body strength (compound lifts)",
          "Day 2: Cardio + core (30-45 mins)",
          "Day 3: Active recovery (yoga/swimming)",
          "Day 4: Upper body focus",
          "Day 5: Lower body focus + cardio",
          "Day 6: Rest or recreational activity"
        ],
        tips: [
          "Maintain variety to prevent plateaus",
          "Focus on form and technique",
          "Listen to your body's recovery needs"
        ]
      }
    };

    // Adjust based on experience level
    const plan = { ...basePlans[userData.goal] || basePlans.maintenance };
    
    if (userData.experience === 'beginner') {
      plan.frequency = "3-4 days/week";
      plan.intensity = "Moderate";
      plan.tips.push("Focus on learning proper form before increasing weight");
    } else if (userData.experience === 'advanced') {
      plan.frequency = plan.frequency.replace(/\d/, m => parseInt(m) + 1);
      plan.tips.push("Consider periodization for long-term progress");
    }

    return plan;
  };

  // Enhanced nutrition plan generator
  const getNutritionPlan = () => {
    // Protein calculation based on goal and experience
    const proteinBase = userData.goal === 'muscle-gain' ? 2.2 : 1.6;
    const protein = Math.round(userData.weight * 
      (userData.experience === 'advanced' ? proteinBase * 1.1 : proteinBase));
    
    // Calorie adjustment
    const calorieAdjustment = {
      'fat-loss': -500,
      'muscle-gain': +300,
      'maintenance': 0
    };
    const calories = Math.round(tdee + (calorieAdjustment[userData.goal] || 0));
    
    // Macro distribution
    const macroRatios = {
      'fat-loss': { carbs: 0.35, fats: 0.3 },
      'muscle-gain': { carbs: 0.45, fats: 0.25 },
      'maintenance': { carbs: 0.4, fats: 0.3 }
    };
    const ratios = macroRatios[userData.goal] || macroRatios.maintenance;
    
    const carbs = Math.round((calories * ratios.carbs) / 4);
    const fats = Math.round((calories * ratios.fats) / 9);

    return { protein, calories, carbs, fats };
  };

  const workoutPlan = getWorkoutPlan();
  const nutritionPlan = getNutritionPlan();

  // BMI classification
  const getBMIClassification = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  return (
    <div className="fitness-results">
      <div className="results-header">
        <h2>Your Personalized Fitness Plan</h2>
        <div className="goal-badge">
          {userData.goal === 'fat-loss' ? 'Fat Loss' : 
           userData.goal === 'muscle-gain' ? 'Muscle Gain' : 'Maintenance'} Program
          <span className="experience-level">({userData.experience})</span>
        </div>
      </div>

      <div className="metrics-section">
        <div className="metric-card">
          <span className="metric-value">{bmi}</span>
          <span className="metric-label">BMI <small>({getBMIClassification(bmi)})</small></span>
          <div className="metric-tooltip">Healthy range: 18.5-24.9</div>
        </div>
        <div className="metric-card">
          <span className="metric-value">{tdee}</span>
          <span className="metric-label">Daily Calories</span>
          <div className="metric-tooltip">BMR: {bmr} kcal</div>
        </div>
        <div className="metric-card">
          <span className="metric-value">{idealWeightMin}-{idealWeightMax}kg</span>
          <span className="metric-label">Healthy Weight</span>
        </div>
      </div>

      <div className="plan-section workout-plan">
        <h3><i className="icon-dumbbell"></i> Workout Plan</h3>
        <div className="plan-highlights">
          <div className="highlight">
            <span>Focus:</span> {workoutPlan.focus}
          </div>
          <div className="highlight">
            <span>Frequency:</span> {workoutPlan.frequency}
          </div>
          <div className="highlight">
            <span>Intensity:</span> {workoutPlan.intensity}
          </div>
        </div>
        
        <div className="workout-split">
          <h4>Weekly Training Split:</h4>
          <ul>
            {workoutPlan.split.map((day, index) => (
              <li key={index}>
                <i className="icon-check"></i> {day}
              </li>
            ))}
          </ul>
        </div>

        <div className="workout-tips">
          <h4>Training Tips:</h4>
          <ul>
            {workoutPlan.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="plan-section nutrition-plan">
        <h3><i className="icon-nutrition"></i> Nutrition Plan</h3>
        <div className="macros-grid">
          <div className="macro-card protein">
            <span className="macro-value">{nutritionPlan.protein}g</span>
            <span className="macro-label">Protein</span>
            <div className="macro-tip">≈ {Math.round(nutritionPlan.protein/5)} servings</div>
          </div>
          <div className="macro-card carbs">
            <span className="macro-value">{nutritionPlan.carbs}g</span>
            <span className="macro-label">Carbs</span>
          </div>
          <div className="macro-card fats">
            <span className="macro-value">{nutritionPlan.fats}g</span>
            <span className="macro-label">Fats</span>
          </div>
          <div className="macro-card calories">
            <span className="macro-value">{nutritionPlan.calories}</span>
            <span className="macro-label">Calories</span>
          </div>
        </div>
        
        <div className="nutrition-tips">
          <h4>Nutrition Guidelines:</h4>
          <ul>
            <li><strong>Protein:</strong> {nutritionPlan.protein}g daily ({userData.weight}kg × {
              userData.goal === 'muscle-gain' ? '2.2' : '1.6'}g/kg)</li>
            <li><strong>Meal timing:</strong> {userData.goal === 'muscle-gain' ? 
              '4-6 meals with protein every 3-4 hours' : '3-4 balanced meals daily'}</li>
            <li><strong>Hydration:</strong> Minimum 3L water daily</li>
            {userData.goal === 'fat-loss' && (
              <li><strong>Deficit:</strong> 300-500kcal below maintenance</li>
            )}
            {userData.goal === 'muscle-gain' && (
              <li><strong>Surplus:</strong> 200-300kcal above maintenance</li>
            )}
          </ul>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={onReset} className="btn reset-btn">
          <i className="icon-refresh"></i> Start Over
        </button>
        <button className="btn print-btn" onClick={() => window.print()}>
          <i className="icon-print"></i> Print Plan
        </button>
      </div>
    </div>
  );
};

export default FitnessResults;