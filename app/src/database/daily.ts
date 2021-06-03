import { dateToString } from "../helpers/utils";
import { IDaily } from "../interfaces/IDaily";
import { dailyEntriesColl, dailyEntriesView } from "./loki-db";

//TODO: Use Dynamic Views and fix methods names and logic if needed

export function insertUpdateLocalDaily(entry: IDaily) {
    const foundEntry = dailyEntriesColl
        .where((doc: IDaily) => {
            const docDate = new Date(doc.date);
            const entryDate = new Date(entry.date);

            const docDateString = dateToString(docDate);
            const entryDateString = dateToString(entryDate);
            if (docDateString === entryDateString) {
                return true;
            }
        });
    if (foundEntry.length === 1) {
        const doc = {
            ...foundEntry[0]
        }
        doc.meals.push(entry.meals[0]);
        const docUpdated = dailyEntriesColl.update(doc);
        if (docUpdated) {
            return foundEntry;
        }
        throw new Error(`There was an error editing daily entry.`);
    } else if (foundEntry.length === 0) {
        const result = dailyEntriesColl.insertOne(entry);
        return result;
    } else {
        throw new Error(`There was more than one record hit. Check the logic again.`);
    }
}

export function removeMealFromLocalDaily({ date, meal }) {
    const result = dailyEntriesColl
        .where((doc: IDaily) => {
            const docDate = new Date(doc.date);
            const entryDate = new Date(date);

            const docDateString = dateToString(docDate);
            const entryDateString = dateToString(entryDate);
            if (docDateString === entryDateString) {
                return true;
            } else {
                return false;
            }
        });
    if (result.length === 1) {
        const doc = {
            ...result[0]
        }
        const index = doc.meals.findIndex(docMeal => docMeal.name === meal.name);
        doc.meals.splice(index, 1);
        const docUpdated = dailyEntriesColl.update(doc);
        if (docUpdated) {
            return docUpdated;
        }
        throw new Error(`There was an error deleting daily entry.`);
    } else {
        return null;
    }
}

export async function getLocalDailyEntry(date: number) {
    const view = dailyEntriesView;
    const result = view
        .applyWhere((doc: IDaily) => {
            const docDate = new Date(doc.date);
            const entryDate = new Date(date);

            const docDateString = dateToString(docDate);
            const entryDateString = dateToString(entryDate);
            if (docDateString === entryDateString) {
                return true;
            } else {
                return false;
            }
        })
        .data({ "removeMeta": true });
    if (result.length === 1) {
        return result[0];
    }
}