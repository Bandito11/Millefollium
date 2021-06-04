import { IIngredient } from "../interfaces/IIngredient";
import { IRecipe } from "../interfaces/IRecipe";

class Recipe implements IRecipe {


    private _category: string;
    public get category(): string {
        return this._category;
    }
    public set category(v: string) {
        this._category = v;
    }

    private _favorite: boolean;
    public get favorite(): boolean {
        return this._favorite;
    }
    public set favorite(v: boolean) {
        this._favorite = v;
    }

    private _steps: string[];
    public get steps(): string[] {
        return this._steps;
    }
    public set steps(v: string[]) {
        this._steps = v;
    }

    private _carbs: number;
    public get carbs(): number {
        return this._carbs;
    }
    public set carbs(v: number) {
        this._carbs = v;
    }

    private _protein: number;
    public get protein(): number {
        return this._protein;
    }
    public set protein(v: number) {
        this._protein = v;
    }

    private _fat: number;
    public get fat(): number {
        return this._fat;
    }
    public set fat(v: number) {
        this._fat = v;
    }

    private _ingredients: IIngredient[];
    public get ingredients(): IIngredient[] {
        return this._ingredients;
    }
    public set ingredients(v: IIngredient[]) {
        this._ingredients = v;
    }

    private _image: string;
    public get image(): string {
        return this._image;
    }
    public set image(v: string) {
        this._image = v;
    }

    private _calories: number;
    public get calories(): number {
        return this._calories;
    }
    public set calories(v: number) {
        this._calories = v;
    }

    private _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(v: string) {
        this._name = v;
    }

}

export default new Recipe();