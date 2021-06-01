import { IDaily, IRecipe } from "../interfaces";

class Daily implements IDaily{

    private _date: number;
    public get date(): number {
        return this._date;
    }
    public set date(v: number) {
        this._date = v;
    }
    
    private _meals : IRecipe[];
    public get meals() : IRecipe[] {
        return this._meals;
    }
    public set meals(v : IRecipe[]) {
        this._meals = v;
    }
    
}

const DailyModel = new Daily();

export default DailyModel;