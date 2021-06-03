import { getOneRecipe, get, getRecipesByFavorite, insert, update, remove, getRecipesByName } from "../database/recipes";
import { IRecipe } from "../interfaces/IRecipe";


export async function getRecipe(name: string) {
    const result = getOneRecipe(name);
    return result;
}

export async function getRecipes(startAfter?): Promise<IRecipe[]> {
    startAfter
    const result = get();
    return result;
}

export async function getFavoriteRecipes(startAfter?): Promise<IRecipe[]> {
    startAfter
    const result = getRecipesByFavorite();
    return result;
}


export async function addRecipe(recipe: IRecipe) {
    const result = insert(recipe);
    return result;
}

export async function updateRecipe(recipe: IRecipe) {
    const result = update(recipe);
    return result;
}

export async function removeRecipe(meal: IRecipe) {
    const result = remove(meal);
    return result;
}

export async function searchRecipe(name: string) {
    const result = getRecipesByName(name);
    return result;
}

export function filterRecipesByCategory({ recipes, category }) {
    if (category === 'none') {
        return recipes;
    }
    const filter = recipes.filter(recipe => recipe.category === category);
    return filter;
}

// export async function rateRecipe(recipe: IRecipe) {
//     try {
//         const res = await postRatingsInFirebase(recipe);
//         return res;
//     } catch (error) {
//         throw error;
//     }
// }

export async function getImageUrl(imagePath) {
    imagePath
    return '';
}