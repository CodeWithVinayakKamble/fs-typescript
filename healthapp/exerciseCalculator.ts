import { isNotNumber } from "./utils.ts";

interface ExerciseValues {
  target: number;
  dailyHrs: number[];
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const userArgs = args.slice(2);
  if (userArgs.some((arg) => isNotNumber(arg)))
    throw new Error("Provided values were not numbers!");

  const [target, ...dailyHrs] = userArgs.map(Number);
  return { target, dailyHrs };
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHrs: number[], target: number): Result => {
  if (dailyHrs.length <= 0) throw new Error("empty hours cannot be accepted");
  if (target <= 0) throw new Error("Target hours must greater than 0");
  if (dailyHrs.some((h) => h < 0))
    throw new Error("Daily exercise hours cannot be negative");

  const trainingDays = dailyHrs.reduce((acc, curr) => {
    if (curr > 0) acc += 1;
    return acc;
  }, 0);

  const totalHours = dailyHrs.reduce((acc, curr) => acc + curr, 0);
  const average = totalHours / dailyHrs.length;

  const getRating = (
    average: number,
    target: number,
  ): { rating: 1 | 2 | 3; ratingDescription: string } => {
    if (average >= target)
      return { rating: 3, ratingDescription: "great job, target reached!" };

    if (average >= target * 0.75)
      return {
        rating: 2,
        ratingDescription: "not too bad but could be better",
      };
    return {
      rating: 1,
      ratingDescription: "you need to push harder next week",
    };
  };

  const { rating, ratingDescription } = getRating(average, target);

  return {
    periodLength: dailyHrs.length,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, dailyHrs } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHrs, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong : ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
