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
export interface oldIDaily {
    date: string;
    calories: string;
    breakfast: oldIMeal[];
    breakfastSnack: oldIMeal[];
    lunch: oldIMeal[];
    lunchSnack: oldIMeal[];
    dinner: oldIMeal[];
    dinnerSnack: oldIMeal[];
}

export interface IDaily {
    date: number;
    meals: IMeal[];
}

export interface IMeal{
    name: string;
    calories: number;
    image: string;
    ingredients: IFoodProduct[];
    fat: number;
    protein: number;
    carbs: number;
    steps: string[];
    category: string;
}

export interface IDailyEntry {
    date: Date;
    type: string
    consumedSize: string;
    foodProduct: IFoodProduct
}

export interface oldIMeal extends IFoodProduct {
    id?: number;
    calories: string;
}

export interface IFoodProduct extends INutritionFacts {
    name: string;
    barcode: string;
    picture: string;
    dateCreated: Date;
}

export interface INutritionFacts {
    servingSize: IServingSize;
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
    vitamin: IVitamin;
    sugar: ISugar;
    sugarAlcohol: ISugar;
}

export interface IVitamin {
    A: IAmount;
    B: IAmount;
    C: IAmount;
    D: IAmount;
    E: IAmount;
}

export interface IServingSize {
    size: string;
    grams: string;
    measurement: string;
}

export interface IFat {
    total: IAmount;
    saturated: IAmount;
    trans: IAmount;
    polyunsaturated: IAmount;
    monounsaturated: IAmount;
}

interface ISugar {
    added: IAmount;
    total: IAmount
}

interface IAmount {
    grams: string;
    percent: string;
}

export interface IUSDA {
    databaseNumber: number;
    foodGroup: string;
    foodName: string;
    protein: number;// (g)
    fat: number;// (g)
    carbohydrates: number;// (g)
    ash: number;// (g)
    calories: number;
    starch: number;// (g)
    sucrose: number;// (g)
    glucose: number;// (g)
    fructose: number;// (g)
    lactose: number;// (g)
    maltose: number;// (g)
    alcohol: number;// (g)
    water: number;// (g)
    caffeine: number; // (mg)
    theobromine: number; // (mg)
    sugar: number;// (g)
    galactose: number;// (g)
    fiber: number;// (g)
    calcium: number; // (mg)
    iron: number; // (mg)
    magnesium: number; // (mg)
    phosphorus: number; // (mg)
    potassium: number; // (mg)
    sodium: number; // (mg)
    zinc: number; // (mg)
    cupper: number; // (mg)
    fluoride: number;// (mcg)
    manganese: number; // (mg)
    selenium: number;// (mcg)
    vitaminA: number;// (IU)
    retinol: number;// (mcg)
    retinolEquivalents: number;// (mcg)
    betaCarotene: number;// (mcg)
    alphaCarotene: number;// (mcg)
    vitaminE: number; // (mg)
    vitaminD: number;// (mcg)
    vitaminD2: number; // (Ergocalciferol)  (mcg)
    vitaminD3: number; // (Cholecalciferol)  (mcg)
    betaCryptoxanthin: number;// (mcg)
    lycopene: number;// (mcg)
    luteinAndZeaxanthin: number;// (mcg)
    vitaminC: number; // (mg)
    thiamin: number; // (mg)
    riboflavin: number; // (mg)
    niacin: number; // (mg)
    vitaminB5: number; // (mg)
    vitaminB6: number; // (mg)
    folate: number; // (mg)
    vitaminB12: number;
    choline: number; // (mg)
    cholesterol: number; // (mg)
    saturatedFat: number;// (g)
    netCarbs: number;
}