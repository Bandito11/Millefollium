import { IRecipe } from "../interfaces";
import { getRecipesFromFirebase, searchRecipeInFirebase, searchRecipeInfoInFirebase } from "./food-tracker.firebase";
import { addRecipeToLocalFavorite, checkRecipeInLocalFavorites, deleteRecipeFromLocalFavorite, getLocalFavorites } from "./local.db";

export async function getRecipes(startAfter?) {
    try {
        const recipes = await getRecipesFromFirebase(startAfter);
        return recipes;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getRecipeInfo(name: string) {
    try {
        let recipeInfo = await searchRecipeInfoInFirebase(name);
        try {
            const result = checkRecipeInLocalFavorites(recipeInfo);
            if (result) {
                recipeInfo.favorite = true;
            } else {
                recipeInfo.favorite = false;
            };
            return recipeInfo;
        } catch (error) {
            //Favorite db error
            recipeInfo.favorite = false;
            return recipeInfo;
        }
    } catch (error) {
        //Firebase Api error
        throw new Error(error);
    }
}

export async function getFavoriteRecipes(): Promise<IRecipe[]> {
    // let interval;
    return new Promise((resolve, reject) => {
        try {
            const result = getLocalFavorites();
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

export async function setFavorite(recipe: IRecipe) {
    const result = addRecipeToLocalFavorite(recipe);
    return result;
}

export async function removeFromFavorites(meal: IRecipe) {
    const result = deleteRecipeFromLocalFavorite(meal);
    return result;
}

export async function searchRecipeInAPI(term) {
    try {
        const result = await searchRecipeInFirebase(term);
        return result;
    } catch (error) {
        throw new Error(error)
    }

}

export function filterRecipesByCategory({ recipes, category }) {
    if (category === 'none') {
        return recipes;
    }
    const filter = recipes.filter(recipe => recipe.category === category);
    return filter;
}