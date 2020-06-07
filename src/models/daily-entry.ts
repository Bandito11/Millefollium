import { IFoodProduct } from "../interfaces";

export class DailyEntry {


    private _date: Date;
    public get date(): Date {
        return this._date;
    }
    public set date(v: Date) {
        this._date = v;
    }


    private _type: string;
    public get type(): string {
        return this._type;
    }
    public set type(v: string) {
        this._type = v;
    }


    private _consumedSize: string;
    public get consumedSize(): string {
        return this._consumedSize;
    }
    public set consumedSize(v: string) {
        this._consumedSize = v;
    }



    private _foodProduct: IFoodProduct;
    public get foodProduct(): IFoodProduct {
        return this._foodProduct;
    }
    public set foodProduct(v: IFoodProduct) {
        this._foodProduct = v;
    }

}
