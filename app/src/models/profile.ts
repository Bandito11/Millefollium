import { IProfile } from "../interfaces/IProfile";

class Profile implements IProfile {
    private _gender: string;
    public get gender(): string {
        return this._gender;
    }
    public set gender(v: string) {
        this._gender = v;
    }

    private _bodyMassIndex: number;
    public get bodyMassIndex(): number {
        return this._bodyMassIndex;
    }
    public set bodyMassIndex(v: number) {
        this._bodyMassIndex = v;
    }


    private _bodyFat: number;
    public get bodyFat(): number {
        return this._bodyFat;
    }
    public set bodyFat(v: number) {
        this._bodyFat = v;
    }

    private _activityLevel: string;
    public get activityLevel(): string {
        return this._activityLevel;
    }
    public set activityLevel(v: string) {
        this._activityLevel = v;
    }

    private _waist: number;
    public get waist(): number {
        return this._waist;
    }
    public set waist(v: number) {
        this._waist = v;
    }


    private _neck: number;
    public get neck(): number {
        return this._neck;
    }
    public set neck(v: number) {
        this._neck = v;
    }


    private _age: number;
    public get age(): number {
        return this._age;
    }
    public set age(v: number) {
        this._age = v;
    }

    private _weight: number;
    public get weight(): number {
        return this._weight;
    }
    public set weight(v: number) {
        this._weight = v;
    }

    private _height: number;
    public get height(): number {
        return this._height;
    }
    public set height(v: number) {
        this._height = v;
    }

}

export default new Profile();