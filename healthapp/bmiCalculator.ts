const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  if (heightInCm <= 0) throw new Error("Height must be greater than zero");
  if (weightInKg <= 0) throw new Error("Weight must be greater than zero");
  const heightInMeter = heightInCm / 100;
  const bmi = weightInKg / (heightInMeter * heightInMeter);
  if (bmi < 18.5) return "Underweight";
  if (bmi <= 25) return "Normal range";
  if (bmi <= 30) return "Overweight";
  return "Obese";
};

try {
  console.log(calculateBmi(180, 74));
} catch (error: unknown) {
  let errorMessage = "Something went wrong : ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
