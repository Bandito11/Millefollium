import { IMeal } from "../interfaces";

export class Daily {

    private _date: string;
    public get date(): string {
        return this._date;
    }
    public set date(v: string) {
        this._date = v;
    }


    private _calories: number;
    public get calories(): number {
        return this._calories;
    }
    public set calories(v: number) {
        this._calories = v;
    }


    private _breakfast: IMeal[];
    public get breakfast(): IMeal[] {
        return this._breakfast;
    }
    public set breakfast(v: IMeal[]) {
        this._breakfast = v;
    }


    private _breakfastSnack: IMeal[];
    public get breakfastSnack(): IMeal[] {
        return this._breakfastSnack;
    }
    public set breakfastSnack(v: IMeal[]) {
        this._breakfastSnack = v;
    }



    private _lunch: IMeal[];
    public get lunch(): IMeal[] {
        return this._lunch;
    }
    public set lunch(v: IMeal[]) {
        this._lunch = v;
    }

    private _lunchSnack: IMeal[];
    public get lunchSnack(): IMeal[] {
        return this._lunchSnack;
    }
    public set lunchSnack(v: IMeal[]) {
        this._lunchSnack = v;
    }


    private _dinner: IMeal[];
    public get dinner(): IMeal[] {
        return this._dinner;
    }
    public set dinner(v: IMeal[]) {
        this._dinner = v;
    }

    private _dinnerSnack: IMeal[];
    public get dinnerSnack(): IMeal[] {
        return this._dinnerSnack;
    }
    public set dinnerSnack(v: IMeal[]) {
        this._dinnerSnack = v;
    }

}