import express from "express";
import { isNotNumber } from "./utils.ts";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNotNumber(height) || isNotNumber(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const heightInCm = Number(height);
  const weightInKg = Number(weight);

  try {
    const bmi = calculateBmi(heightInCm, weightInKg);
    res.status(200).json({ weight: weightInKg, height: heightInCm, bmi });
  } catch {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body || {};

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((hrs) => isNotNumber(hrs)) ||
    isNotNumber(target)
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const dailyHrs = daily_exercises.map(Number);
  const dailyTarget = Number(target);

  try {
    const result = calculateExercises(dailyHrs, dailyTarget);
    res.status(200).json(result);
  } catch {
    res.status(400).json({ error: "malformatted parameters" });
  }
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port : http://localhost:${PORT}`);
});
