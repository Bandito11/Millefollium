import { IRecipe } from "../interfaces";

export const calculateRatings = async (recipe: IRecipe) => {
    if (recipe.ratings.length > 0) {
        let sum = 0;
        recipe.ratings.map(rating => sum += rating.rating);
        recipe.averageRating = sum / recipe.ratings.length;
    }
    return recipe;
}