export interface IResponse {
    success: boolean;
    error: string;
    dateStamp: Date;
    data: IDaily
}

export interface IDaily {
    date?: Date;
    breakfast: IMeal[];
    breakfastSnack: IMeal[];
    lunch: IMeal[];
    lunchSnack: IMeal[];
    dinner: IMeal[];
    dinnerSnack: IMeal[];
}

export interface IEntry {
    id: string;
    date: Date;
    breakfast: IFoodItem[];
    breakfastSnack: IFoodItem[];
    lunch: IFoodItem[];
    lunchSnack: IFoodItem[];
    dinner: IFoodItem[];
    dinnerSnack: IFoodItem[]
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
    number;
    measurement?: string;
}

export interface IFoodItem extends INutritionFacts {
    name: string;
    id: string;
    picture: string;
}

export interface INutritionFacts {
    servingSize: number;
    servingsPerContainer: {
        grams: number;
        amount: string;
    };
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
    dateCreated: string;
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