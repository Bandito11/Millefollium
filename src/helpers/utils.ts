import { IRecipe } from "../interfaces";

export function firstLetterToUpperCase(name: string) {
  let formattedName;
  const array = name.split(' ');
  if (array.length > 0) {
    formattedName = array.map(value => value[0].toUpperCase() + value.substring(1, value.length)).join(' ')
  } else {
    formattedName = name[0].toUpperCase() + name.substring(1, name.length);
  }
  return formattedName;
}

/**
 * Returns date as string in format MM/DD/YYYY
 * @param date 
 */
export function dateToString(date: Date) {
  let month: number | string = date.getMonth() + 1
  let days: number | string = date.getDate()
  if (month < 10) {
    month = `0${date.getMonth()}`
  }
  if (days < 10) {
    days = `0${date.getDate()}`
  }
  return `${month}/${days}/${date.getFullYear()}`;
}

export enum mealCategories {
  breakfast = 'breakfast',
  snack = 'snack',
  lunch = 'lunch',
  dinner = 'dinner',
  dessert = 'dessert'
}

export enum mealTypes {
  breakfast = 'breakfast',
  breakfastSnack = 'breakfastSnack',
  lunch = 'lunch',
  lunchSnack = 'lunchSnack',
  dinner = 'dinner',
  dinnerSnack = 'dinnerSnack'
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

export async function goToRecipeInfo(name: string) {
  const router = document.querySelector('ion-router');
  if (router) {
    return router.push(`/recipe/info/${name}`, 'forward');
  }
  return false;
}

export function convertHeightToInches({ height, width }) {
  const heightInches = height * 12;
  return heightInches + width;
}

export function convertHeightToFeetInches(height) {
  const heightFeet = parseInt((height / 12).toFixed(1));
  const heightInches = height % 12;
  return { heightFeet, heightInches };
}

export function recommendedCaloriesPerActivityLevel({ activityLevel, age, gender }) {
  if (gender === 'male') {
    if (age >= 2 && age <= 3) {
      if (activityLevel === 'sedentary') {
        return 1000;
      } else if (activityLevel === 'moderately active') {
        return 1000;
      } else if (activityLevel === 'active') {
        return 1000;
      }
    } else if (age >= 4 && age <= 8) {
      if (activityLevel === 'sedentary') {
        return 1400;
      } else if (activityLevel === 'moderately active') {
        return 1600;
      } else if (activityLevel === 'active') {
        return 2000;
      }
    } else if (age >= 9 && age <= 13) {
      if (activityLevel === 'sedentary') {
        return 2000;
      } else if (activityLevel === 'moderately active') {
        return 2200;
      } else if (activityLevel === 'active') {
        return 2600;
      }
    } else if (age >= 14 && age <= 18) {
      if (activityLevel === 'sedentary') {
        return 2400;
      } else if (activityLevel === 'moderately active') {
        return 2800;
      } else if (activityLevel === 'active') {
        return 3200;
      }
    } else if (age >= 19 && age <= 30) {
      if (activityLevel === 'sedentary') {
        return 2600;
      } else if (activityLevel === 'moderately active') {
        return 2800;
      } else if (activityLevel === 'active') {
        return 3000;
      }
    } else if (age >= 31 && age <= 50) {
      if (activityLevel === 'sedentary') {
        return 2400;
      } else if (activityLevel === 'moderately active') {
        return 2600;
      } else if (activityLevel === 'active') {
        return 3000;
      }
    } else if (age >= 51) {
      if (activityLevel === 'sedentary') {
        return 2200;
      } else if (activityLevel === 'moderately active') {
        return 2400;
      } else if (activityLevel === 'active') {
        return 2800;
      }
    }
  } else if (gender === 'female') {
    if (age >= 2 && age <= 3) {
      if (activityLevel === 'sedentary') {
        return 1000;
      } else if (activityLevel === 'moderately active') {
        return 1000;
      } else if (activityLevel === 'active') {
        return 1000;
      }
    } else if (age >= 4 && age <= 8) {
      if (activityLevel === 'sedentary') {
        return 1400;
      } else if (activityLevel === 'moderately active') {
        return 1600;
      } else if (activityLevel === 'active') {
        return 1800;
      }
    } else if (age >= 9 && age <= 13) {
      if (activityLevel === 'sedentary') {
        return 1600;
      } else if (activityLevel === 'moderately active') {
        return 2200;
      } else if (activityLevel === 'active') {
        return 2200;
      }
    } else if (age >= 14 && age <= 18) {
      if (activityLevel === 'sedentary') {
        return 1800;
      } else if (activityLevel === 'moderately active') {
        return 2000;
      } else if (activityLevel === 'active') {
        return 2400;
      }
    } else if (age >= 19 && age <= 30) {
      if (activityLevel === 'sedentary') {
        return 2000;
      } else if (activityLevel === 'moderately active') {
        return 2200;
      } else if (activityLevel === 'active') {
        return 2400;
      }
    } else if (age >= 31 && age <= 50) {
      if (activityLevel === 'sedentary') {
        return 1800;
      } else if (activityLevel === 'moderately active') {
        return 2000;
      } else if (activityLevel === 'active') {
        return 2200;
      }
    } else if (age >= 51) {
      if (activityLevel === 'sedentary') {
        return 1600;
      } else if (activityLevel === 'moderately active') {
        return 1800;
      } else if (activityLevel === 'active') {
        return 2200;
      }
    }
  }
}

export function calculateCalorieIntake({ recommendedCalories, dailyCalories }) {
  let weighLoss = 0;
  if (recommendedCalories && dailyCalories) {
    weighLoss = recommendedCalories - dailyCalories;
  }
  return weighLoss;
}