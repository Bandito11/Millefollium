import loki from 'lokijs';
import { dateToString } from '../helpers/utils';
import { IDaily, IProfile } from '../interfaces';
import { CapacitorFileLokiAdapter } from './capacitor-file-loki-adapter';

const partioningAdapter = new loki.LokiPartitioningAdapter(new CapacitorFileLokiAdapter(), { paging: true });

let dailyEntriesColl: Collection<IDaily>;
let profileColl: Collection<IProfile>;

const options: Partial<LokiConfigOptions> = {
    autosave: true,
    autoload: true,
    autoloadCallback: _loadDatabase,
    adapter: partioningAdapter
}

const db = new loki('food-tracker.db', options);

function _loadDatabase() {
    dailyEntriesColl = db.getCollection('DailyEntries');
    if (!dailyEntriesColl) {
        dailyEntriesColl = db.addCollection('DailyEntries');
    };
    profileColl = db.getCollection('Profile');
    if (!profileColl) {
        profileColl = db.addCollection('Profile');
    };
}

export function insertUpdateDaily(entry: IDaily) {
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
        } else {
            throw new Error(`There was an error editing daily entry.`);
        }
    } else {
        const result = dailyEntriesColl.insertOne(entry);
        if (result) {
            return result;
        } else {
            throw new Error(`There was an error adding the entry to the database.`);
        }
    }
}

export function removeMealFromDaily({ date, meal }) {
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
        } else {
            throw new Error(`There was an error deleting daily entry.`);
        }
    } else {
        throw new Error(`An entry for this date wasn't found.`);
    }
}

export function getDailyEntry(date: number) {
    try {
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
            return result[0];
        }
    } catch (error) {
        throw new Error(error);
    }
}