import { IDaily } from '../interfaces/IDaily';
import { dailyEntriesColl, dailyEntriesView } from './loki-db';

//TODO: Use Dynamic Views and fix methods names and logic if needed

export function insertUpdateDaily(entry: IDaily) {
  const foundEntry = dailyEntriesColl.where((doc: IDaily) => {
    if (doc.date === entry.date) {
      return true;
    }
  });
  if (foundEntry.length === 1) {
    const doc = {
      ...foundEntry[0],
    };
    doc.meals.push(entry.meals[0]);
    const docUpdated = dailyEntriesColl.update(doc);
    return docUpdated;
  } else if (foundEntry.length === 0) {
    const result = dailyEntriesColl.insertOne(entry);
    return result;
  } else {
    throw new Error(
      `There was more than one record found for this daily entry.`
    );
  }
}

export function removeMeal({ date, meal }) {
  const result = dailyEntriesColl.where((doc: IDaily) => {
    if (doc.date === date) {
      return true;
    } else {
      return false;
    }
  });
  if (result.length === 1) {
    const doc = {
      ...result[0],
    };
    const index = doc.meals.findIndex((docMeal) => docMeal.name === meal.name);
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

export async function getDailyEntry(date: number) {
  dailyEntriesView.removeFilters();
  const result = dailyEntriesView
    .applyWhere((doc: IDaily) => {
      if (doc.date === date) {
        return true;
      } else {
        return false;
      }
    })
    .applySimpleSort('date')
    .data({ removeMeta: true });
  if (result.length === 1) {
    return result[0];
  }
}
