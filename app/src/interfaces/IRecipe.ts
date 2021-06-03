import { IIngredient } from "./IIngredient";
import { IRating } from "./IRating";

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
    averageRating: number,
    favorite?: boolean,
    ratings: IRating[]
}
