
export function capitalizeFirstLetter(name: string) {
  if (name) {
    let formattedName;
    formattedName = name[0].toUpperCase() + name.substring(1, name.length);
    return formattedName;
  }
  return name;
}

export function capitalizeAllFirstLetters(name: string) {
  const array = name.split(' ');
  if (array.length > 0) {
    const formattedName = array.map(value => value[0].toUpperCase() + value.substring(1, value.length)).join(' ')
    return formattedName;
  }
  return name;
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

export async function goToRecipeInfo(name: string) {
  const router = document.querySelector('ion-router');
  if (router) {
    return router.push(`/recipe/${name}`, 'forward');
  }
  return false;
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
