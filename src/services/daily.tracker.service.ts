import { IDaily, IRecipe } from "../interfaces";
import { getDailyEntry, insertUpdateDaily, removeMealFromDaily } from "./local.db";

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
