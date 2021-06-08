import { IProfile } from "../interfaces/IProfile";
import { IRecipe } from "../interfaces/IRecipe";

export function convertHeightToInches({ height, width: inches }) {
    const heightInches = height * 12;
    return heightInches + inches;
  }
  
  export function convertHeightToFeetInches(height) {
    const heightFeet = parseInt((height / 12).toFixed(1));
    const heightInches = height % 12;
    return { heightFeet, heightInches };
  }
  
export function calculateCalorieIntake({ recommendedCalories, dailyCalories }) {
    let weighLoss = 0;
    if (recommendedCalories && dailyCalories) {
      weighLoss = recommendedCalories - dailyCalories;
    }
    return weighLoss;
  }
  
  export function calculateBodyFat(profile: IProfile) {
    let gender = 0;
    if (profile.gender === 'male') {
      gender = 1
    }
    let bodyFat = 0;
    if (profile.age > 15) {
      //Adult Body Fat
      bodyFat = (1.39 * profile.bodyMassIndex) + (0.16 * profile.age) - (10.34 * gender) - 9;
    } else {
      //Children Body Fat
      bodyFat = (1.51 * profile.bodyMassIndex) + (0.23 * profile.age) - (3.6 * gender) + 1.4;
    }
    return bodyFat;
  }
  
  export function calculateBMI(profile: IProfile) {
    if (profile.height > 0) {
      const bmi = (profile.weight / Math.pow(profile.height, 2)) * 703;
      return bmi;
    } else {
      return 0;
    }
  }

export function calculateMacros(meals: IRecipe[]) {
    let totalCalories = 0;
    let totalFat = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
  
    meals.forEach(meal => {
      totalCalories += meal.calories;
      totalFat += meal.fat;
      totalProtein += meal.protein;
      totalCarbs += meal.carbs;
    });
  
    if (totalCalories > 0) {
      totalFat = ((totalFat * 9) / totalCalories) * 100;
      totalProtein = ((totalProtein * 4) / totalCalories) * 100;
      totalCarbs = ((totalCarbs * 4) / totalCalories) * 100;
    } else {
      totalFat = 0;
      totalProtein = 0;
      totalCarbs = 0;
    }
  
    return {
      calories: totalCalories,
      protein: totalProtein.toFixed(0),
      carbs: totalCarbs.toFixed(0),
      fat: totalFat.toFixed(0)
    }
  }