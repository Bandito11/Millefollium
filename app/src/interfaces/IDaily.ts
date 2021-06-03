import { IRecipe } from "./IRecipe";

export interface IDaily {
    date: number;
    meals: IRecipe[];
}