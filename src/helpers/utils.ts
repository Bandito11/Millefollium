export function foodNameToUppercase(name: string) {
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