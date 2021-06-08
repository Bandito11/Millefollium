import { IIngredient } from './IIngredient';

export interface IRecipe {
  name: string;
  image: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  ingredients: IIngredient[];
  steps: string[];
  category: string;
  favorite: boolean;
  utensils: string[];
  notes: string;
}
