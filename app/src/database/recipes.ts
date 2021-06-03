import { IRecipe } from "../interfaces/IRecipe";
import { recipesColl, recipesView } from "./loki-db";

//TODO: Use Dynamic Views

export function insert(recipe: IRecipe) {
    const result = recipesColl.findOne(recipe);
    if (result) {
        throw new Error(`${recipe.name} already exists in database.`)
    } else {
        const result = recipesColl.insertOne(recipe);
        return result;
    }
}

export function update(recipe: IRecipe) {
    const result = recipesColl.findOne(recipe);
    if (result) {
        const doc: IRecipe = {
            ...result,
            ...recipe
        }
        const updatedDoc = recipesColl.update(doc);
        return updatedDoc;
    }
    throw new Error(`${recipe.name} doesn't exist in database. Cannot update from database.`)
}

export function remove(recipe: IRecipe) {
    const found = recipesColl.findOne({ name: recipe.name });
    if (found) {
        const result = recipesColl.remove(found);
        return result;
    }
    throw new Error(`${recipe.name} doesn't exist in database. Cannot delete from database.`);
}

export function get(startAfter?) {
    const view = recipesView;
    const data = view
        .applySimpleSort('name', { "useJavascriptSorting": true })
        .data({ "removeMeta": true });
    return data;
}

export function getOneRecipe(name: string) {
    const view = recipesView;
    const result = recipesColl.findOne({ name: name });
    return result;
}

export function getRecipesByName(name: string) {
    const view = recipesView;
    const result = recipesColl.find({ name: name });
    return result;
}

export function getRecipesByFavorite() {
    const view = recipesView;
    const result = recipesColl.find({ favorite: true });
    return result;
}