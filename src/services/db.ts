import { IFoodItem as IFoodProduct, IResponse, IDaily, IEntry as IDailyEntry } from './../interfaces.d';
import { dateToString, mealTypes } from '../helpers/utils';
declare const loki;

const options: Partial<LokiConfigOptions> = {
    autoload: true,
    autosave: true,
    autoloadCallback: createCollection
}

const db: Loki = new loki('millefollium.db', options);

let foodProductsColl: Collection<IFoodProduct>;
let dailyEntriesColl: Collection<IDailyEntry>;

createCollection();

function createCollection() {
    db.loadDatabase();
    foodProductsColl = db.getCollection('FoodProducts');
    if (!foodProductsColl) {
        foodProductsColl = db.addCollection('FoodProducts');
    }
    dailyEntriesColl = db.getCollection('DailyItems');
    if (!dailyEntriesColl) {
        dailyEntriesColl = db.addCollection('DailyItems');
    }
}

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
        }
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
            }
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

export function getFoodProduct($loki: number) {
    const response: IResponse<IFoodProduct & LokiObj> = {
        success: false,
        error: `Didn't find any results.`,
        data: null,
        dateStamp: new Date(),
        message: null
    };
    const results = foodProductsColl.get($loki);
    if (results) {
        return {
            ...response,
            error: null,
            success: true,
            data: results
        }
    } else {
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
    })
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
    const response: IResponse<IDailyEntry> = {
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
            message: `Data was added to the database!`
        }
    } else {
        return response;
    }
}

export function editDaily(opts: { servingSize, id: number }) {
    const response: IResponse<IDailyEntry> = {
        success: false,
        error: `There was an error editing daily entry.`,
        data: undefined,
        dateStamp: new Date(),
        message: null
    };
    const result = dailyEntriesColl.get(opts.id);
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

export function deleteDaily(id: number) {
    const response: IResponse<IDailyEntry> = {
        success: false,
        error: `There was an error deleting daily entry.`,
        data: undefined,
        dateStamp: new Date(),
        message: null
    };
    const result = dailyEntriesColl.get(id);
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
        dateStamp: new Date(),
        message: null
    };
    const today = dateToString(date);
    const result = dailyEntriesColl.where(entry => today == dateToString(new Date(entry.date)));
    if (result.length > 0) {
        let foodProducts = [];
        for (const entry of result) {
            const foodProductResult = foodProductsColl.get(parseInt(entry.productId));
            if (foodProductResult) {
                foodProducts.push({
                    id: entry['$loki'],
                    foodProduct: foodProductResult,
                    type: entry.type,
                    calories: parseInt(entry.consumedSize) * parseInt(foodProductResult.calories)
                });
            }
        };
        if (foodProducts.length > 0) {
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
            for (const foodProduct of foodProducts) {
                switch (foodProduct.type) {
                    case mealTypes.breakfast:
                        data.breakfast.push({
                            ...foodProduct.foodProduct,
                            calories: foodProduct.calories,
                            id: foodProduct.id
                        });
                        break;
                    case mealTypes.breakfastSnack:
                        data.breakfastSnack.push({
                            ...foodProduct.foodProduct,
                            calories: foodProduct.calories,
                            id: foodProduct.id
                        });
                        break;
                    case mealTypes.lunch:
                        data.lunch.push({
                            ...foodProduct.foodProduct,
                            calories: foodProduct.calories,
                            id: foodProduct.id
                        });
                        break;
                    case mealTypes.lunchSnack:
                        data.lunchSnack.push({
                            ...foodProduct.foodProduct,
                            calories: foodProduct.calories,
                            id: foodProduct.id
                        });
                        break;
                    case mealTypes.dinner:
                        data.dinner.push({
                            ...foodProduct.foodProduct,
                            calories: foodProduct.calories,
                            id: foodProduct.id
                        });
                        break;
                    case mealTypes.dinnerSnack:
                        data.dinnerSnack.push({
                            ...foodProduct.foodProduct,
                            calories: foodProduct.calories,
                            id: foodProduct.id
                        });
                        break;
                }
            };
            return {
                ...response,
                success: true,
                data: { ...data }
            }
        } else {
            return {
                ...response,
                error: `There isn't a daily entry today.`
            };
        }
    } else {
        return {
            ...response,
            error: `Couldn't find daily entry.`
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