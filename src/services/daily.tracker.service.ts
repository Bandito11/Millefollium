import { IDaily, IRecipe } from "../interfaces";
import { getDailyEntry, insertUpdateDaily, removeMealFromDaily } from "./local.db";

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

export async function addNewDailyMeal(meal: IRecipe) {
    const newDaily: IDaily = {
        date: new Date().valueOf(),
        meals: [meal]
    }
    try {
        insertUpdateDaily(newDaily);
        return true;
    } catch (error) {
        throw new Error(error);
    }

}

export function getTodayDaily(date: number): Promise<IDaily> {
    return new Promise((resolve) => {
        try {
            const result = getDailyEntry(date);
            resolve(result);
        } catch (error) {
            // clearTimeout(timeout);
            // console.error(error);
            // reject(error);
            throw new Error(error);
        }
    });
}

export function deleteMealFromDaily({date, meal}){
    try {
        return removeMealFromDaily({ meal: meal, date: date });
    } catch (error) {
        throw new Error(error);
    }
}
