import { IRecipe } from "../interfaces";
import { postRecipeToFirebase, searchRecipeInFirebase } from "./admin.db";


export async function postRecipe(recipe: IRecipe) {
    try {
        await postRecipeToFirebase(recipe);
    } catch (error) {
        throw error;
    }
}

export async function searchForRecipe(name: string) {
    try {
        const response = await searchRecipeInFirebase(name);
        return response;
    } catch (error) {
        throw error;
    }
}