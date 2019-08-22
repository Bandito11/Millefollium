import { IFoodItem, IResponse } from './../interfaces.d';
declare const loki;

const db: Loki = new loki('millefollium.db');

let foodItemColl: Collection<IFoodItem>;

createCollection();

function createCollection() {
    db.loadDatabase();
    foodItemColl = db.getCollection('FoodItems');
    if (!foodItemColl) {
        foodItemColl = db.addCollection('FoodItems');
    }
    db.saveDatabase();
}

export function insertOrUpdateFoodItem(foodItem: IFoodItem): IResponse<IFoodItem> {
    const result = foodItemColl.find({
        barcode: foodItem.barcode,
        name: foodItem.name
    });
    if (result) {
        foodItemColl.insertOne(foodItem);
        return {
            success: true,
            error: null,
            data: null,
            dateStamp: new Date(),
            message: 'Food Item was added successfully.'
        }
    } else {
        foodItemColl.update(foodItem);
        return {
            success: true,
            error: null,
            data: null,
            dateStamp: new Date(),
            message: 'Food Item was updated successfully.'
        }
    }
}

export function deleteFoodItem(foodItem: IFoodItem): IResponse<IFoodItem> {
    foodItemColl.findAndRemove(foodItem);
    return {
        success: true,
        error: null,
        data: null,
        dateStamp: new Date(),
        message: 'Food Item was removed successfully',
    }
}

export function getFoodItem(foodItem: IFoodItem): IResponse<IFoodItem> {
    let response: IResponse<IFoodItem> = {
        success: false,
        error: `Didn't find any results.`,
        data: null,
        dateStamp: new Date(),
        message: null
    };

    const results = foodItemColl.findOne(foodItem)
    if (results) {
        return {
            ...response,
            success: true,
            data: results,
        };
    } else {
        return response
    }
}



//TODO: Figure out what the hell I was doing here
export function getPastDailyEntries(foodItem: IFoodItem & LokiObj): IResponse<IFoodItem> {
    let response: IResponse<IFoodItem> = {
        success: false,
        error: `Didn't find any results.`,
        data: null,
        dateStamp: new Date(),
        message: null
    };
    let results;
    if (foodItem['$loki']) {
        results = foodItemColl
            .chain()
            .find({ '$loki': { $gt: foodItem.$loki } })
            .limit(10)
            .data();
    } else {
        results = foodItemColl
            .chain()
            .find({ 'dateCreated': { $lt: foodItem.dateCreated } })
            .limit(10)
            .data();
    }

    if (results) {
        return {
            ...response,
            success: true,
            data: results,
        };
    } else {
        return response
    }
}

