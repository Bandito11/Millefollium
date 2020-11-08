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
        throw new Error(error);
    }
}

export function getTodayDaily(date: number): Promise<IDaily> {
    // let interval;
    return new Promise((resolve, reject) => {
        try {
            const result = getLocalDailyEntry(date);
            // clearInterval(interval);
            resolve(result);
        } catch (error) {
            // interval = setInterval(() => {
            //     try {
            //         const result = getLocalDailyEntry(date);
            //         clearInterval(interval);
            //         resolve(result);
            //     } catch (error) {
            //         try{
            //             const errorMessage: string = error.message;
            //             if (!errorMessage.includes('where')) {
            //                 reject(error);
            //             }    
            //         } catch(error2){
            //             reject(error);
            //         }
            //     }
            // }, 1000);
        }
    });
}

export function deleteMealFromDaily({ date, meal }) {
    try {
        return removeMealFromLocalDaily({ meal: meal, date: date });
    } catch (error) {
        throw new Error(error);
    }
}