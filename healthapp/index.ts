import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { isNotNumber } from "./utils.ts";

const app = express();

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
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port : http://localhost:${PORT}`);
});
