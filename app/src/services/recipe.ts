import {
  getOneRecipe,
  get,
  insert,
  update,
  remove,
  getRecipesByName,
  getRecipesByCategory,
  getRecipesByFavorite,
} from '../database/recipes';
import { IRecipe } from '../interfaces/IRecipe';

export function getRecipe(name: string) {
  return getOneRecipe(name);
}

export async function getRecipes(startAfter?) {
  startAfter;
  return await get();
}

export function getFavoriteRecipes(startAfter?) {
  startAfter;
  return getRecipesByFavorite();
}

export function addRecipe(recipe: IRecipe) {
  return insert(recipe);
}

export function updateRecipe(recipe: IRecipe & LokiObj) {
  return update(recipe);
}

export function removeRecipe(meal: IRecipe & LokiObj) {
  return remove(meal);
}

export function searchRecipe(name: string) {
  return getRecipesByName(name);
}

export async function filterRecipesByCategory(category: string) {
  if (category === 'none') {
    return await getRecipes();
  }
  if (category === 'favorites') {
    return getFavoriteRecipes();
  }
  return getRecipesByCategory(category);
}

export function getImageUrl(imagePath) {
  imagePath;
  return '';
}
