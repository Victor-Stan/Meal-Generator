import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [category, setCategory] = useState("");
  const [meal, setMeal] = useState(null);

  const handleGenerateMeal = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/meal/${category}`
      );
      setMeal(response.data);
    } catch (error) {
      console.error("Error fetching meal", error);
    }
  };

  return (
    <div>
      <h1>Random Meal Generator</h1>
      <div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Seafood">Seafood</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Dessert">Dessert</option>
          <option value="Beef">Beef</option>
          <option value="Chicken">Chicken</option>
          <option value="Pasta">Pasta</option>
          <option value="Pork">Pork</option>
        </select>
        <button onClick={handleGenerateMeal}>Generate</button>
      </div>
      {meal && (
        <div>
          <h2>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} width="200" />
          <ul>
            {Object.keys(meal)
              .filter((key) => key.startsWith("strIngredient") && meal[key])
              .map((key, index) => (
                <li key={index}>{meal[key]}</li>
              ))}
          </ul>
          <p>Fun Fact: This meal is a popular dish in {meal.strArea}.</p>
        </div>
      )}
    </div>
  );
};

export default App;
