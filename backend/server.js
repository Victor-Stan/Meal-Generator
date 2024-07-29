const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/meal/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const meals = response.data.meals;

    if (meals && meals.length > 0) {
      const randomMeal = meals[Math.floor(Math.random() * meals.length)];

      const mealDetailsResponse = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`
      );
      const mealDetails = mealDetailsResponse.data.meals[0];

      res.json(mealDetails);
    } else {
      res.status(404).json({ message: "No meals found for this category" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data from the MealDB API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
