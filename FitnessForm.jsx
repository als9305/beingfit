// src/components/FitnessForm.js
import { useState } from 'react';

const FitnessForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    goal: 'fat-loss',
    weight: '',
    height: '',
    experience: 'beginner',
    activityLevel: 'moderate'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert string numbers to actual numbers
    const processedData = {
      ...formData,
      weight: Number(formData.weight),
      height: Number(formData.height),
      age: Number(formData.age)
    };
    onSubmit(processedData);
  };

  return (
    <form onSubmit={handleSubmit} className="fitness-form">
      <div className="form-group">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          min="15"
          max="100"
        />
      </div>

      <div className="form-group">
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="form-group">
        <label>Primary Goal:</label>
        <select name="goal" value={formData.goal} onChange={handleChange}>
          <option value="fat-loss">Fat Loss</option>
          <option value="muscle-gain">Muscle Gain</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <div className="form-group">
        <label>Weight (kg):</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
          min="30"
          max="200"
          step="0.1"
        />
      </div>

      <div className="form-group">
        <label>Height (cm):</label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
          min="100"
          max="250"
        />
      </div>

      <div className="form-group">
        <label>Experience Level:</label>
        <select name="experience" value={formData.experience} onChange={handleChange}>
          <option value="beginner">Beginner (0-1 year)</option>
          <option value="intermediate">Intermediate (1-3 years)</option>
          <option value="advanced">Advanced (3+ years)</option>
        </select>
      </div>

      <div className="form-group">
        <label>Activity Level:</label>
        <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
          <option value="sedentary">Sedentary (little or no exercise)</option>
          <option value="light">Lightly Active (light exercise 1-3 days/week)</option>
          <option value="moderate">Moderately Active (moderate exercise 3-5 days/week)</option>
          <option value="active">Very Active (hard exercise 6-7 days/week)</option>
          <option value="veryActive">Extremely Active (athlete level)</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">Generate Plan</button>
    </form>
  );
};

export default FitnessForm;