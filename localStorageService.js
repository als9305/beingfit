// src/services/localStorageService.js

/**
 * Retrieves data from localStorage with fallback to default value
 * @param {string} key - Storage key
 * @param {*} defaultValue - Fallback value if key doesn't exist
 * @returns {*} Parsed value or defaultValue
 */
export const getFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Saves data to localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} True if successful
 */
export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

/**
 * Updates specific fields in stored object without overwriting
 * @param {string} key - Storage key
 * @param {object} updates - Key-value pairs to update
 */
export const updateInStorage = (key, updates) => {
  try {
    const currentData = getFromStorage(key, {});
    const updatedData = { ...currentData, ...updates };
    saveToStorage(key, updatedData);
    return updatedData;
  } catch (error) {
    console.error('Error updating localStorage:', error);
    return null;
  }
};

/**
 * Clears specific key or all app data if no key provided
 * @param {string|null} key - Optional key to clear
 */
export const clearStorage = (key = null) => {
  try {
    if (key) {
      localStorage.removeItem(key);
    } else {
      // Clear all app-related storage
      Object.values(STORAGE_KEYS).forEach(k => {
        localStorage.removeItem(k);
      });
    }
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

/**
 * Gets all stored data for debugging/export
 * @returns {object} All stored app data
 */
export const exportStorage = () => {
  return Object.values(STORAGE_KEYS).reduce((acc, key) => {
    acc[key] = getFromStorage(key, null);
    return acc;
  }, {});
};

// Storage keys with expiration support
export const STORAGE_KEYS = {
  WATER_TRACKER: 'BeingFit_waterTracker',
  EXERCISE_LOGS: 'BeingFit_exerciseLogs',
  BMI_HISTORY: 'BeingFit_bmiHistory',
  NUTRITION_LOGS: 'BeingFit_nutritionLogs',
  DIET_PLAN: 'BeingFit_dietPlan',
  DIET_PREFERENCES: 'BeingFit_dietPreferences',
  MEAL_HISTORY: 'BeingFits_mealHistory'
};

// Optional: Add expiration wrapper functions
export const setWithExpiry = (key, value, ttl) => {
  const now = new Date();
  const item = {
    value,
    expiry: now.getTime() + ttl
  };
  saveToStorage(key, item);
};

export const getWithExpiry = (key) => {
  const item = getFromStorage(key, null);
  if (!item) return null;
  
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};