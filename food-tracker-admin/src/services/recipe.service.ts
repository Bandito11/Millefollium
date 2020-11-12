import { IRecipe } from "../interfaces";
import { postRecipeToFirebase } from "./admin.db";


export async function postRecipe(recipe: IRecipe) {
    try {
        await postRecipeToFirebase(recipe);
    } catch (error) {
        throw error;
    }
}