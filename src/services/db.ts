import { IFoodItem, IResponse, IEntry } from './../interfaces.d';
declare const loki;

const options: Partial<LokiConfigOptions> = {
    autoload: true,
    autosave: true,
    autoloadCallback: createCollection
}

const db: Loki = new loki('millefollium.db', options);

let foodItemsColl: Collection<IFoodItem>;
let entriesColl: Collection<IEntry>;

createCollection();

function createCollection() {
    db.loadDatabase();
    foodItemsColl = db.getCollection('FoodItems');
    if (!foodItemsColl) {
        foodItemsColl = db.addCollection('FoodItems');
    }
}

export function insertOrUpdateFoodItem(foodItem: IFoodItem): IResponse<IFoodItem> {
    const response = {
        success: false,
        error: null,
        data: null,
        dateStamp: new Date(),
        message: null
    };
    const result = foodItemsColl.findOne({
        barcode: foodItem.barcode,
        name: foodItem.name
    });
    if (result) {
        foodItemsColl.update(result);
        return {
            ...response,
            success: true,
            message: 'Food Item was updated successfully.'
        }
    } else {
        foodItemsColl.insertOne(foodItem);
        return {
            ...response,
            success: true,
            message: 'Food Item was added successfully.'
        }
    }
}

export function deleteFoodItem(foodItem: IFoodItem) {
    const response: IResponse<IFoodItem & LokiObj> = {
        success: false,
        error: `Couldn't find the food product in DB`,
        data: null,
        dateStamp: new Date(),
        message: null
    };
    try {
        foodItemsColl.remove(foodItem);
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

export function getFoodItem($loki: number) {
    const response: IResponse<IFoodItem & LokiObj> = {
        success: false,
        error: `Didn't find any results.`,
        data: null,
        dateStamp: new Date(),
        message: null
    };
    const results = foodItemsColl.get($loki);
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

export function getFoodItems(query): IResponse<(IFoodItem & LokiObj)[]> {
    const response: IResponse<(IFoodItem & LokiObj)[]> = {
        success: false,
        error: `Didn't find any results.`,
        data: null,
        dateStamp: new Date(),
        message: null
    };

    const results = foodItemsColl.find({
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

export function addToDaily(entry: IEntry) {
    const response: IResponse<IEntry> = {
        success: false,
        error: `There was an error adding entry to database.`,
        data: undefined,
        dateStamp: new Date(),
        message: null
    }
    const newEntry: IEntry = {
        ...entry,
        date: new Date()
    }
    const result = entriesColl.insertOne(newEntry);
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

export function getDaily(): IResponse<IEntry> {
    const response: IResponse<IEntry> = {
        success: false,
        error: null,
        data: undefined,
        dateStamp: new Date(),
        message: null
    }
    const date = new Date();
    const today = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    const result = entriesColl.findObjects((entry: IEntry) => {
        const dailyDate = `${entry.date.getMonth()}/${entry.date.getDate()}/${entry.date.getFullYear()}`;
        if (today === dailyDate) {
            return entry;
        }
    });
    const latestEntry = result.pop();
    if (result) {
        return {
            ...response,
            error: null,
            success: true,
            data: latestEntry
        }
    } else {
        return {
            ...response,
            error: `Couldn't find daily entry.`
        };
    }
}
