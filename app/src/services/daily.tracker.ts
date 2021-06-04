import { insertUpdateDaily, getDailyEntry, removeMeal } from "../database/daily";
import { IDaily } from "../interfaces/IDaily";
import { IRecipe } from "../interfaces/IRecipe";

export async function addNewDailyMeal(meal: IRecipe) {
    const newDaily: IDaily = {
        date: new Date().valueOf(),
        meals: [meal]
    }
    const result = insertUpdateDaily(newDaily);
    return result;

}

export function getTodayDaily(date: number) {
    const result = getDailyEntry(date);
    return result;
}

export function removeMealFromDaily({ date, meal }) {
    return removeMeal({ meal: meal, date: date });
}