import { FoodProduct } from "./food-product";

export abstract class Meal extends FoodProduct{

    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

}
