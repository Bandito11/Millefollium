import { INutritionFacts } from "./INutritionFacts";

export interface IFoodProduct extends INutritionFacts {
    name: string;
    barcode: string;
    picture: string;
    dateCreated: Date;
}
