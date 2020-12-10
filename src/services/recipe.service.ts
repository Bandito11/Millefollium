import { IRecipe } from "../interfaces";
import { getRecipesFromFirebase, searchRecipeInfoInFirebase, searchRecipeInFirebase, postRatingsInFirebase, getPictureFromFirebaseStorage } from "./food-tracker.firebase";
import { checkRecipeInLocalFavorites, getLocalFavorites, addRecipeToLocalFavorite, deleteRecipeFromLocalFavorite } from "./local.db";

export async function getRecipes(startAfter?) {
    try {
        const recipes = await getRecipesFromFirebase(startAfter);
        return recipes;
    } catch (error) {
        throw error;
    }
}

export async function getRecipeInfo(name: string) {
    try {
        let response = await searchRecipeInfoInFirebase(name);
        try {
            const result = checkRecipeInLocalFavorites(response);
            if (result) {
                response.favorite = true;
            } else {
                response.favorite = false;
            };
            const recipeInfo = {
                ...response,
                image: await getImageUrl(response.image)
            }
            return recipeInfo;
        } catch (error) {
            //Favorite db error
            response.favorite = false;
            const recipeInfo = {
                ...response,
                image: await getImageUrl(response.image)
            }
            return recipeInfo;
        }
    } catch (error) {
        //Firebase Api error
        throw error;
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
        throw error;
    }

}

export function filterRecipesByCategory({ recipes, category }) {
    if (category === 'none') {
        return recipes;
    }
    const filter = recipes.filter(recipe => recipe.category === category);
    return filter;
}

export async function rateRecipe(recipe: IRecipe) {
    try {
        const res = await postRatingsInFirebase(recipe);
        return res;
    } catch (error) {
        throw error;
    }
}

export async function getImageUrl(imagePath) {
    try {
        const url = await getPictureFromFirebaseStorage(imagePath);
        return url;
    } catch (error) {
        throw error;
    }
}