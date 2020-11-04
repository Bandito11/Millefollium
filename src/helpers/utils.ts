import { IMeal } from "../interfaces";

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
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export enum mealTypes {
  breakfast = 'breakfast',
  breakfastSnack = 'breakfastSnack',
  lunch = 'lunch',
  lunchSnack = 'lunchSnack',
  dinner = 'dinner',
  dinnerSnack = 'dinnerSnack'
}


export function calculateMacros(meals: IMeal[]) {
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
    dailyCalories: totalCalories,
    dailyProtein: totalProtein.toFixed(0),
    dailyCarbs: totalCarbs.toFixed(0),
    dailyFat: totalFat.toFixed(0)
  }
}


export async function goToRecipeInfo(name: string) {
  const router = document.querySelector('ion-router');
  if (router) {
    return router.push(`/recipe/info/${name}`, 'forward');
  }
  return false;
}
