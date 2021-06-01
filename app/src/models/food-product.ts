import { NutritionFacts } from "./nutrition-facts";

export abstract class FoodProduct extends NutritionFacts {

    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }


    private _barcode: string;
    public get barcode(): string {
        return this._barcode;
    }
    public set barcode(v: string) {
        this._barcode = v;
    }

    private _picture: string;
    public get picture(): string {
        return this._picture;
    }
    public set picture(v: string) {
        this._picture = v;
    }


    private _dateCreated: Date;
    public get dateCreated(): Date {
        return this._dateCreated;
    }
    public set dateCreated(v: Date) {
        this._dateCreated = v;
    }

}