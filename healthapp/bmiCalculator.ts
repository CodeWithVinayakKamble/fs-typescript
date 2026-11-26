import { isNotNumber } from "./utils.ts";

interface BmiValues {
  heightInCm: number;
  weightInKg: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      heightInCm: Number(args[2]),
      weightInKg: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (
  heightInCm: number,
  weightInKg: number,
): string => {
  if (heightInCm <= 0) throw new Error("Height must be greater than zero");
  if (weightInKg <= 0) throw new Error("Weight must be greater than zero");
  const heightInMeter = heightInCm / 100;
  const bmi = weightInKg / (heightInMeter * heightInMeter);
  if (bmi < 18.5) return "Underweight";
  if (bmi <= 25) return "Normal range";
  if (bmi <= 30) return "Overweight";
  return "Obese";
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { heightInCm, weightInKg } = parseArguments(process.argv);
    console.log(calculateBmi(heightInCm, weightInKg));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong : ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}
