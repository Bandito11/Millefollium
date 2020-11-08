import loki from 'lokijs';
import { dateToString } from '../helpers/utils';
import { IDaily, IProfile, IRecipe } from '../interfaces';
import { CapacitorFileLokiAdapter } from './capacitor-file-loki-adapter';

const partioningAdapter = new loki.LokiPartitioningAdapter(new CapacitorFileLokiAdapter(), { paging: true });

let db: Loki;
let dailyEntriesColl: Collection<IDaily>;
let profileColl: Collection<IProfile>;
let favoritesColl: Collection<IRecipe>;

const options: Partial<LokiConfigOptions> = {
    autosave: true,
    autoload: true,
    autoloadCallback: _loadDatabase,
    adapter: partioningAdapter
}

export function initLocalDB() {
    db = new loki('food-tracker.db', options);
}
function _loadDatabase() {
    dailyEntriesColl = db.getCollection('DailyEntries');
    if (!dailyEntriesColl) {
        dailyEntriesColl = db.addCollection('DailyEntries');
    };
    profileColl = db.getCollection('Profile');
    if (!profileColl) {
        profileColl = db.addCollection('Profile');
    };
    favoritesColl = db.getCollection('Favorites');
    if (!favoritesColl) {
        favoritesColl = db.addCollection('Favorites');
    };
}

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

export function getLocalDailyEntry(date: number) {
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

export function addRecipeToLocalFavorite(recipe: IRecipe) {
    try {
        const result = favoritesColl.findOne({ name: recipe.name });
        if (result) {
            const doc = {
                ...result,
                ...recipe
            }
            const docUpdated = favoritesColl.update(doc);
            return docUpdated;
        } else {
            const result = favoritesColl.insertOne(recipe);
            return result;
        }
    } catch (error) {
        throw new Error(error);
    }
}

export function deleteRecipeFromLocalFavorite(recipe: IRecipe) {
    try {
        const found = favoritesColl.findOne({ name: recipe.name });
        if (found) {
            const result = favoritesColl.remove(found);
            if (result) {
                return result;
            }
        }
        throw new Error(`Didn't find a favorite item for this recipe.`);
    } catch (error) {
        throw new Error(error);
    }
}

export function getLocalFavorites() {
    try {
        return favoritesColl.data;
    } catch (error) {
        throw new Error();
    }
}

export function checkRecipeInLocalFavorites(recipe: IRecipe) {
    try {
        const result = favoritesColl.findOne({ name: recipe.name });
        return result;
    } catch (error) {
        throw new Error(error);
    }
}