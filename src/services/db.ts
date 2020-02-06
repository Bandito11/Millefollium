import { IResponse, IDaily, IFoodProduct, IDailyEntry } from './../interfaces.d';
import { dateToString, mealTypes } from '../helpers/utils';
import { CapacitorFileLokiAdapter } from './capacitor-file-loki-adapter';
import loki from 'lokijs';

const partioningAdapter = new loki.LokiPartitioningAdapter(new CapacitorFileLokiAdapter(), { paging: true });

let foodProductsColl: Collection<IFoodProduct>;
let dailyEntriesColl: Collection<IDailyEntry>;

const options: Partial<LokiConfigOptions> = {
    autosave: true,
    autoload: true,
    autoloadCallback: () => {
        foodProductsColl = db.getCollection('FoodProducts');
        if (!foodProductsColl) {
            foodProductsColl = db.addCollection('FoodProducts');
        };
        dailyEntriesColl = db.getCollection('DailyItems');
        if (!dailyEntriesColl) {
            dailyEntriesColl = db.addCollection('DailyItems');
        };
        if (foodProductsColl.count() < 6348) {
            let foodDataWorker = new Worker('/workers/usda-file-v2.js')
            if (typeof (foodDataWorker) !== undefined) {
                foodDataWorker.onmessage = event => {
                    event.data.forEach((product: IFoodProduct) => insertOrUpdateFoodProduct(product)
                    foodDataWorker.terminate();
                     }); 
            }
        }
    },
    adapter: partioningAdapter
}

const db: Loki = new loki('millefollium.db', options);

export function insertOrUpdateFoodProduct(foodItem: IFoodProduct): IResponse<IFoodProduct> {
    const response = {
        success: false,
        error: null,
        data: null,
        dateStamp: new Date(),
        message: null
    };
    if (foodItem.hasOwnProperty('$loki')) {
        const doc = foodProductsColl.update(foodItem);
        if (!doc) {
            return {
                ...response,
                error: 'Error updating data. Please try again.'
            }
        };
        dailyEntriesColl.updateWhere(data => data.foodProduct.name === doc.name, result => {
            result.foodProduct = {
                ...doc
            };
            return result;
        });
        return {
            ...response,
            success: true,
            message: 'Food Item was updated successfully.'
        }
    } else {
        const result = foodProductsColl.findOne({
            barcode: foodItem.barcode,
            name: foodItem.name
        });
        if (result) {
            return {
                ...response,
                error: `Barcode or Food Name already exists. Please search for it and edit the product instead.`
            }
        } else {
            const doc = foodProductsColl.insertOne(foodItem);
            if (!doc) {
                return {
                    ...response,
                    error: 'Error updating data. Please try again.'
                }
            };
            return {
                ...response,
                success: true,
                message: 'Food Item was added successfully.'
            }
        }
    }
}

export function deleteFoodProduct(foodItem: IFoodProduct) {
    const response: IResponse<IFoodProduct & LokiObj> = {
        success: false,
        error: `Couldn't find the food product in DB`,
        data: null,
        dateStamp: new Date(),
        message: null
    };
    try {
        foodProductsColl.remove(foodItem);
        return {
            ...response,
            error: null,
            success: true,
            message: 'Food Item was removed successfully',
        }
    } catch (error) {
        return response;
    }
}


export function getFoodProducts(query): IResponse<(IFoodProduct & LokiObj)[]> {
    const response: IResponse<(IFoodProduct & LokiObj)[]> = {
        success: false,
        error: `Didn't find any results.`,
        data: null,
        dateStamp: new Date(),
        message: null
    };

    const results = foodProductsColl.find({
        $or: [{ barcode: query }, { name: { $contains: [query] } }]
    });
    if (results.length > 0) {
        return {
            ...response,
            error: null,
            success: true,
            data: results,
        };
    } else {
        return response
    }
}

export function addToDaily(entry: IDailyEntry) {
    const response: IResponse<undefined> = {
        success: false,
        error: `There was an error adding entry to database.`,
        data: undefined,
        dateStamp: new Date(),
        message: null
    }
    const result = dailyEntriesColl.insertOne(entry);
    if (result) {
        return {
            ...response,
            error: null,
            success: true,
            message: `Entry was added!`
        }
    } else {
        return response;
    }
}

export function editDaily(opts: { servingSize, foodProduct: IFoodProduct }) {
    const response: IResponse<undefined> = {
        success: false,
        error: `There was an error editing daily entry.`,
        data: undefined,
        dateStamp: new Date(),
        message: null
    };
    const result = dailyEntriesColl.findOne({
        date: opts.foodProduct.dateCreated
    });
    if (result) {
        const docUpdated = dailyEntriesColl.update({
            ...result,
            consumedSize: opts.servingSize
        });
        if (docUpdated) {
            return {
                ...response,
                error: '',
                success: true,
                message: 'Entry was updated.'
            }
        } else {
            return response;
        }
    } else {
        return response;
    }
}

export function deleteDaily(foodProduct: IFoodProduct) {
    const response: IResponse<undefined> = {
        success: false,
        error: `There was an error deleting daily entry.`,
        data: undefined,
        dateStamp: new Date(),
        message: null
    };
    const result = dailyEntriesColl.findOne({
        date: foodProduct.dateCreated
    });
    if (result) {
        const docUpdated = dailyEntriesColl.remove(result);
        if (docUpdated) {
            return {
                ...response,
                error: '',
                success: true,
                message: 'Entry was deleted.'
            }
        } else {
            return response;
        }
    } else {
        return response;
    }
}

export function getDaily(date: Date): IResponse<IDaily> {
    const response: IResponse<IDaily> = {
        success: false,
        error: null,
        data: null,
        dateStamp: date,
        message: null
    };
    const today = dateToString(date);
    let data: IDaily = {
        date: today,
        calories: '0',
        breakfast: [],
        breakfastSnack: [],
        lunch: [],
        lunchSnack: [],
        dinner: [],
        dinnerSnack: []
    };
    let results: IDailyEntry[] = [];
    try {
        results = dailyEntriesColl.where(entry => today == dateToString(new Date(entry.date)));
    } catch (error) {
        return response;
    }
    if (results.length > 0) {
        results.forEach(dailyEntry => {
            switch (dailyEntry.type) {
                case mealTypes.breakfast:
                    data.breakfast.push({
                        ...dailyEntry.foodProduct,
                        calories: (parseInt(dailyEntry.consumedSize) * parseInt(dailyEntry.foodProduct.calories)).toString(),
                        dateCreated: dailyEntry.date
                    });
                    break;
                case mealTypes.breakfastSnack:
                    data.breakfastSnack.push({
                        ...dailyEntry.foodProduct,
                        calories: (parseInt(dailyEntry.consumedSize) * parseInt(dailyEntry.foodProduct.calories)).toString(),
                        dateCreated: dailyEntry.date
                    });
                    break;
                case mealTypes.lunch:
                    data.lunch.push({
                        ...dailyEntry.foodProduct,
                        calories: (parseInt(dailyEntry.consumedSize) * parseInt(dailyEntry.foodProduct.calories)).toString(),
                        dateCreated: dailyEntry.date
                    });
                    break;
                case mealTypes.lunchSnack:
                    data.lunchSnack.push({
                        ...dailyEntry.foodProduct,
                        calories: (parseInt(dailyEntry.consumedSize) * parseInt(dailyEntry.foodProduct.calories)).toString(),
                        dateCreated: dailyEntry.date
                    });
                    break;
                case mealTypes.dinner:
                    data.dinner.push({
                        ...dailyEntry.foodProduct,
                        calories: (parseInt(dailyEntry.consumedSize) * parseInt(dailyEntry.foodProduct.calories)).toString(),
                        dateCreated: dailyEntry.date
                    });
                    break;
                case mealTypes.dinnerSnack:
                    data.dinnerSnack.push({
                        ...dailyEntry.foodProduct,
                        calories: (parseInt(dailyEntry.consumedSize) * parseInt(dailyEntry.foodProduct.calories)).toString(),
                        dateCreated: dailyEntry.date
                    });
                    break;
            }
        });
        return {
            ...response,
            success: true,
            data: data
        }
    } else {
        return {
            ...response,
            error: `Didn't find daily entry.`
        };
    }
}

export function getDailyEntries(date: Date[]) {
    const response: IResponse<IDaily[]> = {
        success: false,
        error: 'There was an error retrieving the data.',
        data: null,
        dateStamp: new Date(),
        message: null
    };
    let dailyEntries = [];
    date.forEach(value => {
        dailyEntries.push(getDaily(value));
    });
    if (dailyEntries.length > 0) {
        response.data = [];
        dailyEntries.forEach(entry => {
            if (entry.success) {
                response.data.push(entry.data)
            }
        });
        return {
            ...response,
            success: true,
            error: null
        }
    } else {
        return response;
    }
}
