import { IServingSize, IFat, IAmount, ISugar, IVitamin } from "../interfaces";

 export abstract class NutritionFacts {
    
    private _servingSize : IServingSize;
    public get servingSize() : IServingSize {
        return this._servingSize;
    }
    public set servingSize(v : IServingSize) {
        this._servingSize = v;
    }
    
        
    private _servingPerContainer : number;
    public get servingPerContainer() : number {
        return this._servingPerContainer;
    }
    public set servingPerContainer(v : number) {
        this._servingPerContainer = v;
    }
    
    
    private _calories : number;
    public get calories() : number {
        return this._calories;
    }
    public set calories(v : number) {
        this._calories = v;
    }
   
    
    private _fat : IFat;
    public get fat() : IFat {
        return this._fat;
    }
    public set fat(v : IFat) {
        this._fat = v;
    }
    
    
    private _cholesterol : IAmount;
    public get cholesterol() : IAmount {
        return this._cholesterol;
    }
    public set cholesterol(v : IAmount) {
        this._cholesterol = v;
    }
    
    
    private _sodium : IAmount;
    public get sodium() : IAmount {
        return this._sodium;
    }
    public set sodium(v : IAmount) {
        this._sodium = v;
    }
    
    
    private _potassium : IAmount;
    public get potassium() : IAmount {
        return this._potassium;
    }
    public set potassium(v : IAmount) {
        this._potassium = v;
    }
    
    
    private _totalCarbohydrates : IAmount;
    public get totalCarbohydrates() : IAmount {
        return this._totalCarbohydrates;
    }
    public set totalCarbohydrates(v : IAmount) {
        this._totalCarbohydrates = v;
    }
    
    
    private _dietaryFiber : IAmount;
    public get dietaryFiber() : IAmount {
        return this._dietaryFiber;
    }
    public set dietaryFiber(v : IAmount) {
        this._dietaryFiber = v;
    }
    
    
    private _protein : IAmount;
    public get protein() : IAmount {
        return this._protein;
    }
    public set protein(v : IAmount) {
        this._protein = v;
    }
    
    
    private _niacin : IAmount;
    public get niacin() : IAmount {
        return this._niacin;
    }
    public set niacin(v : IAmount) {
        this._niacin = v;
    }
   
    
    private _phosphorus : IAmount;
    public get phosphorus() : IAmount {
        return this._phosphorus;
    }
    public set phosphorus(v : IAmount) {
        this._phosphorus = v;
    }
    
    
    private _calcium : IAmount;
    public get calcium() : IAmount {
        return this._calcium;
    }
    public set calcium(v : IAmount) {
        this._calcium = v;
    }
    
    
    private _iron : IAmount;
    public get iron() : IAmount {
        return this._iron;
    }
    public set iron(v : IAmount) {
        this._iron = v;
    }
   
    
    private _magnesium : IAmount;
    public get magnesium() : IAmount {
        return this._magnesium;
    }
    public set magnesium(v : IAmount) {
        this._magnesium = v;
    }
   
    
    private _manganese : IAmount;
    public get manganese() : IAmount {
        return this._manganese;
    }
    public set manganese(v : IAmount) {
        this._manganese = v;
    }

    
    private _vitamin : IVitamin;
    public get vitamin() : IVitamin {
        return this._vitamin;
    }
    public set vitamin(v : IVitamin) {
        this._vitamin = v;
    }
    
           
    private _sugar : ISugar;
    public get sugar() : ISugar {
        return this._sugar;
    }
    public set sugar(v : ISugar) {
        this._sugar = v;
    }
    
    
    private _sugarAlcohol : ISugar;
    public get sugarAlcohol() : ISugar {
        return this._sugarAlcohol;
    }
    public set sugarAlcohol(v : ISugar) {
        this._sugarAlcohol = v;
    }
    
}
