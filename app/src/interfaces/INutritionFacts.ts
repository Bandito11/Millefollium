import { IAmount } from "./IAmount";
import { ISugar } from "./ISugar";
import { IVitamin } from "./IVitamin";

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
