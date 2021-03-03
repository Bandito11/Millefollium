import { oldIMeal } from "../interfaces";

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


    private _breakfast: oldIMeal[];
    public get breakfast(): oldIMeal[] {
        return this._breakfast;
    }
    public set breakfast(v: oldIMeal[]) {
        this._breakfast = v;
    }


    private _breakfastSnack: oldIMeal[];
    public get breakfastSnack(): oldIMeal[] {
        return this._breakfastSnack;
    }
    public set breakfastSnack(v: oldIMeal[]) {
        this._breakfastSnack = v;
    }



    private _lunch: oldIMeal[];
    public get lunch(): oldIMeal[] {
        return this._lunch;
    }
    public set lunch(v: oldIMeal[]) {
        this._lunch = v;
    }

    private _lunchSnack: oldIMeal[];
    public get lunchSnack(): oldIMeal[] {
        return this._lunchSnack;
    }
    public set lunchSnack(v: oldIMeal[]) {
        this._lunchSnack = v;
    }


    private _dinner: oldIMeal[];
    public get dinner(): oldIMeal[] {
        return this._dinner;
    }
    public set dinner(v: oldIMeal[]) {
        this._dinner = v;
    }

    private _dinnerSnack: oldIMeal[];
    public get dinnerSnack(): oldIMeal[] {
        return this._dinnerSnack;
    }
    public set dinnerSnack(v: oldIMeal[]) {
        this._dinnerSnack = v;
    }

}