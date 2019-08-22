import { IFoodItem, IResponse } from "./interface";

declare const loki;

const db: Loki = new loki('millefollium.db');

let foodItemColl: Collection<IFoodItem>;

function createCollection() {
    db.loadDatabase();
    foodItemColl = db.getCollection('FoodItems');
    if (!foodItemColl) {
        foodItemColl = db.addCollection('FoodItems');
    }
    db.saveDatabase();
}

function insertOrUpdateFoodItem(foodItem: IFoodItem) {
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

function deleteFoodItem(foodItem: IFoodItem): IResponse {
    const result = foodItemColl.findAndRemove(foodItem);
    return {
        success: true,
        error: null,
        data: null,
        dateStamp: new Date(),
        message: 'Food Item was removed successfully',
    }
}

function getFoodItem(foodItem: IFoodItem & LokiObj): IResponse {
    let results = null;
    let response = {
        success: false,
        error: `Didn't find any results.`,
        data: null,
        dateStamp: new Date(),
        message: null
    };

    if (foodItem['$loki']) {
        results = foodItemColl
            .chain()
            .limit(10)
            .data();
    } else {
        results = foodItemColl
            .chain()
            .find({ '$loki': { $gt: foodItem.dateCreated } })
            .limit(10)
            .data();
    }
    if (results) {
        return response;
    } else {
        response = {
            ...response,
            success: true,
            data: results,
        }
    }
}

