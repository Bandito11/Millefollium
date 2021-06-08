import { IIngredient } from "./IIngredient";

export interface IRecipe {
    name: string;
    calories: number;
    image: string;
    ingredients: IIngredient[];
    fat: number;
    protein: number;
    carbs: number;
    steps: string[];
    category: string;
    favorite: boolean;
    utensils: string[];
}
