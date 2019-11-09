export interface IResponse<T> {
    success: boolean;
    error: string;
    dateStamp: Date;
    data: T;
    message: any;
}

/**
 * Date Format: MM/DD/YYYY
 */
export interface IDaily {
    date: string;
    calories: string;
    breakfast: IMeal[];
    breakfastSnack: IMeal[];
    lunch: IMeal[];
    lunchSnack: IMeal[];
    dinner: IMeal[];
    dinnerSnack: IMeal[];
}

export interface IDailyEntry {
    date: Date;
    type: string
    consumedSize: string;
    foodProduct: IFoodProduct
}

//TODO: To delete
export interface IEntry {
    date: Date;
    productId: string;
    type: string
    consumedSize: string;
}

interface IMeal extends IFoodProduct {
    id?: number;
    calories: string;
}

// interface IMeasurement {
//     size: string;
//     grams: string;
//     measurement: string;
// }

export interface IFoodProduct extends INutritionFacts {
    name: string;
    barcode: string;
    picture: string;
    dateCreated: Date;
}

export interface INutritionFacts {
    servingSize: {
        size: string;
        grams: string;
        measurement: string;
    };
    servingPerContainer: string;
    calories: string;
    fat: {
        total: IAmount;
        saturated: IAmount;
        trans: IAmount;
        polyunsaturated: IAmount;
        monounsaturated: IAmount;
    };
    cholesterol: IAmount;
    sodium: IAmount;
    potassium: IAmount;
    totalCarbohydrates: IAmount;
    dietaryFiber: IAmount;
    protein: IAmount;
    niacin: IAmount;
    phosphorus: IAmount;
    calcium: IAmount;
    iron: IAmount;
    magnesium: IAmount;
    manganese: IAmount;
    vitamin: {
        A: IAmount;
        B: IAmount;
        C: IAmount;
        D: IAmount;
        E: IAmount;
    };
    sugar: ISugar;
    sugarAlcohol: ISugar;
}

interface ISugar {
    added: IAmount;
    total: IAmount
}

interface IAmount {
    grams: string;
    percent: string;
}
