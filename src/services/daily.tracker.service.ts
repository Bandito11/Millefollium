import { IDaily, IRecipe } from "../interfaces";
import { getLocalDailyEntry, insertUpdateLocalDaily, removeMealFromLocalDaily } from "./local.db";

export async function addNewDailyMeal(meal: IRecipe) {
    const newDaily: IDaily = {
        date: new Date().valueOf(),
        meals: [meal]
    }
    try {
        const result = insertUpdateLocalDaily(newDaily);
        return result;
    } catch (error) {
        throw error
    }
}

export function getTodayDaily(date: number) {
        try {
            const result = getLocalDailyEntry(date);
            return result;
        } catch (error) {
            throw error
        }
}

export function deleteMealFromDaily({ date, meal }) {
    try {
        return removeMealFromLocalDaily({ meal: meal, date: date });
    } catch (error) {
        throw error
    }
}