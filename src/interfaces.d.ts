export interface IResponse<T> {
    success: boolean;
    error: string;
    dateStamp: Date;
    data: T;
    message: string;
}

export interface IEntry {
    date: Date;
    breakfast: IMeal[];
    breakfastSnack: IMeal[];
    lunch: IMeal[];
    lunchSnack: IMeal[];
    dinner: IMeal[];
    dinnerSnack: IMeal[];
}

interface IMeal {
    name: string;
    calories: number;
    fat: IFat;
    protein: number;
    dietaryFiber: IAmount;
    totalCarbohydrates: IAmount;
    sugar: ISugar;
    sugarAlcohol: ISugar;
    servingsSize: number;
}

interface measurement {
    size: number;
    grams: number;
    measurement: string;
}

export interface IFoodItem extends INutritionFacts {
    name: string;
    barcode: string;
    picture: string;
    dateCreated: Date;
}

export interface INutritionFacts {
    servingSize: measurement;
    servingPerContainer: number;
    calories: number;
    fat: IFat;
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

interface IFat {
    total: IAmount;
    saturated: IAmount;
    trans: IAmount;
    polyunsaturated: IAmount;
    monounsaturated: IAmount;
}

interface IAmount {
    grams: number;
    percent: number;
}
