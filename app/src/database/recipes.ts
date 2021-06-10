import { IRecipe } from '../interfaces/IRecipe';
import { recipesColl, recipesView } from './loki-db';

export function insert(recipe: IRecipe) {
  const result = recipesColl.findOne({ name: recipe.name });
  if (result) {
    throw new Error(
      `${recipe.name} already exists in database. Please try writing a different name.`
    );
  } else {
    const result = recipesColl.insertOne(recipe);
    return result;
  }
}

export function update(recipe: IRecipe & LokiObj) {
  const result = recipesColl.get(recipe.$loki);
  if (result) {
    const doc: IRecipe = {
      ...result,
      ...recipe,
    };
    const updatedDoc = recipesColl.update(doc);
    return updatedDoc;
  }
  throw new Error(
    `${recipe.name} doesn't exist in database. Cannot update from database.`
  );
}

export function remove(recipe: IRecipe & LokiObj) {
  const found = recipesColl.get(recipe.$loki);
  if (found) {
    const result = recipesColl.remove(found);
    return result;
  }
  throw new Error(
    `${recipe.name} doesn't exist in database. Cannot delete from database.`
  );
}

//FIXME: Delete the ASYNC and the Fetch
export async function get() {
  // await fetch('assets/mock/recipes.json')
  //   .then((res) => res.json())
  //   .then((data) =>
  //     data.map((item) => {
  //       try {
  //         insert(item);
  //       } catch (error) {
  //         error;
  //       }
  //     })
  //   );
  recipesView.removeFilters();
  const data = recipesView
    .applySimpleSort('name', { useJavascriptSorting: true })
    .data({ removeMeta: true });
  return data;
}

export function getOneRecipe(name: string) {
  const result = recipesColl.findOne({ name: name });
  if (result) {
    return result;
  } else {
    throw new Error(`Couldn't find a recipe called ${name}`);
  }
}

export function getRecipesByName(name: string) {
  recipesView.removeFilters();
  const result = recipesView
    .applyFind({ name: { $contains: name } })
    .applySimpleSort('name')
    .data({ removeMeta: true });
  return result;
}

export function getRecipesByFavorite() {
  recipesView.removeFilters();
  const result = recipesView
    .applyFind({ favorite: true })
    .applySimpleSort('name')
    .data({ removeMeta: true });
  return result;
}
export function getRecipesByCategory(category: string) {
  recipesView.removeFilters();
  const result = recipesView
    .applyFind({ category: category })
    .applySimpleSort('name')
    .data({ removeMeta: true });
  return result;
}
