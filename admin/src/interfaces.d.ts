export interface IRecipe {
    id?;
    name: string;
    calories: number;
    image: File;
    ingredients: IIngredient[];
    fat: number;
    protein: number;
    carbs: number;
    steps: string[];
    category: string;
    averageRating: number;
    ratings: IRating[];
    notes: string;
}
export interface IIngredient {
    name: string,
    amount: string;
}
interface IRating {
    id: string;
    rating: number;
}