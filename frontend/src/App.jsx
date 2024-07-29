import React, { useState } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
    <div className="flex flex-col items-center p-4">
      <div className="text-2xl font-bold mb-4">
        <h1>Meal Roulette</h1>
      </div>

      <div className="w-full max-w-md">
        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Seafood">Seafood</SelectItem>
              <SelectItem value="Vegan">Vegan</SelectItem>
              <SelectItem value="Vegetarian">Vegetarian</SelectItem>
              <SelectItem value="Dessert">Dessert</SelectItem>
              <SelectItem value="Beef">Beef</SelectItem>
              <SelectItem value="Chicken">Chicken</SelectItem>
              <SelectItem value="Pasta">Pasta</SelectItem>
              <SelectItem value="Pork">Pork</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button className="w-full mt-2 mb-4" onClick={handleGenerateMeal}>
          Generate Random Meal
        </Button>
      </div>

      {meal && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{meal.strMeal}</CardTitle>
            <CardDescription>Popular dish in {meal.strArea}</CardDescription>
          </CardHeader>
          <CardContent>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full rounded-lg mb-4"
            />
            <ul className="list-disc list-inside">
              {Object.keys(meal)
                .filter((key) => key.startsWith("strIngredient") && meal[key])
                .map((key, index) => (
                  <li key={index}>{meal[key]}</li>
                ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default App;
