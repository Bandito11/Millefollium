import { insertUpdateLocalDaily, getLocalDailyEntry, removeMealFromLocalDaily } from "../database/daily";
import { IDaily } from "../interfaces/IDaily";
import { IRecipe } from "../interfaces/IRecipe";

export async function addNewDailyMeal(meal: IRecipe) {
    const newDaily: IDaily = {
        date: new Date().valueOf(),
        meals: [meal]
    }
    const result = insertUpdateLocalDaily(newDaily);
    return result;

}

export function getTodayDaily(date: number) {
    const result = getLocalDailyEntry(date);
    return result;
}

export function removeMealFromDaily({ date, meal }) {
    return removeMealFromLocalDaily({ meal: meal, date: date });
}