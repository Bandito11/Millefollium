import { IRecipe } from "../interfaces";

export function getNewRecipes() {
    //////?TODO: Get this information from internet
    const frenchToast: IRecipe = {
        name: 'French Toast',
        ingredients: [],
        image: '/assets/images/frenchtoast.jpg',
        protein: 24,
        carbs: 12,
        steps: [],
        calories: 400,
        fat: 19,
        category: 'breakfast',
        ratings: 5
    }

    const chickenRice: IRecipe = {
        name: 'Chicken with Rice & Spinach',
        ingredients: [],
        image: '/assets/images/chickenrice.jpg',
        protein: 30,
        carbs: 40,
        steps: [],
        calories: 600,
        fat: 10,
        category: 'dinner',
        ratings: 3
    }
    ////
    return [frenchToast, chickenRice];
}

export function getFavoriteRecipes() {
    //////?TODO: Get this information from the local database
    const frenchToast: IRecipe = {
        name: 'French Toast',
        ingredients: [],
        image: '/assets/images/frenchtoast.jpg',
        protein: 24,
        carbs: 12,
        steps: [],
        calories: 400,
        fat: 19,
        category: 'breakfast',
        ratings: 5
    }

    const chickenRice: IRecipe = {
        name: 'Chicken with Rice & Spinach',
        ingredients: [],
        image: '/assets/images/chickenrice.jpg',
        protein: 30,
        carbs: 40,
        steps: [],
        calories: 600,
        fat: 10,
        category: 'dinner',
        ratings: 3
    }
    ////
    return [frenchToast, chickenRice];
}