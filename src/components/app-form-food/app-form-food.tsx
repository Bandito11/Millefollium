import { Component, h, State } from "@stencil/core";
import { IFoodItem } from "../../interfaces";
import { foodNameToUppercase } from '../../helpers/utils';
import { insertOrUpdateFoodProduct, deleteFoodProduct, getFoodProduct } from "../../services/db";



import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { writeImageFile, readImageFile } from "../../services/filesystem";

const { Camera } = Plugins;





enum foodFormControls {
    servingSizeAmount = 'servingSizeAmount',
    servingPerContainer = 'servingPerContainer',
    calories = 'calories',
    totalFatGrams = 'totalFatGrams',
    totalFatPercent = 'totalFatPercent',
    saturatedFatGrams = 'saturatedFatGrams',
    saturatedFatPercent = 'saturatedFatPercent',
    transFatGrams = 'transFatGrams',
    transFatPercent = 'transFatPercent',
    polyunsaturatedFatGrams = 'polyunsaturatedFatGrams',
    polyunsaturatedFatPercent = 'polyunsaturatedFatPercent',
    monounsaturatedFatGrams = 'monounsaturatedFatGrams',
    monounsaturatedFatPercent = 'monounsaturatedFatPercent',
    cholesterolGrams = 'cholesterolGrams',
    cholesterolPercent = 'cholesterolPercent',
    sodiumGrams = 'sodiumGrams',
    sodiumPercent = 'sodiumPercent',
    potassiumGrams = 'potassiumGrams',
    potassiumPercent = 'potassiumPercent',
    totalCarbohydratesGrams = 'totalCarbohydratesGrams',
    totalCarbohydratesPercent = 'totalCarbohydratesPercent',
    dietaryFiberGrams = 'dietaryFiberGrams',
    dietaryFiberPercent = 'dietaryFiberPercent',
    proteinGrams = 'proteinGrams',
    proteinPercent = 'proteinPercent',
    niacinGrams = 'niacinGrams',
    niacinPercent = 'niacinPercent',
    phosphorusGrams = 'phosphorusGrams',
    phosphorusPercent = 'phosphorusPercent',
    calciumGrams = 'calciumGrams',
    calciumPercent = 'calciumPercent',
    ironGrams = 'ironGrams',
    ironPercent = 'ironPercent',
    magnesiumGrams = 'magnesiumGrams',
    magnesiumPercent = 'magnesiumPercent',
    manganeseGrams = 'manganeseGrams',
    manganesePercent = 'manganesePercent',
    vitaminAGrams = 'vitaminAGrams',
    vitaminAPercent = 'vitaminAPercent',
    vitaminBGrams = 'vitaminBGrams',
    vitaminBPercent = 'vitaminBPercent',
    vitaminCGrams = 'vitaminCGrams',
    vitaminCPercent = 'vitaminCPercent',
    vitaminDGrams = 'vitaminDGrams',
    vitaminDPercent = 'vitaminDPercent',
    vitaminEGrams = 'vitaminEGrams',
    vitaminEPercent = 'vitaminEPercent',
    sugarTotalGrams = 'sugarTotalGrams',
    sugarTotalPercent = 'sugarTotalPercent',
    sugarAddedGrams = 'sugarAddedGrams',
    sugarAddedPercent = 'sugarAddedPercent',
    sugarAlcoholTotalGrams = 'sugarAlcoholTotalGrams',
    sugarAlcoholTotalPercent = 'sugarAlcoholTotalPercent',
    sugarAlcoholAddedGrams = 'sugarAlcoholAddedGrams',
    sugarAlcoholAddedPercent = 'sugarAlcoholAddedPercent',
    servingSizeGrams = 'servingSizeGrams'
}

@Component({
    tag: 'app-form-food',
    styleUrl: 'app-form-food.css'
})
export class AppDaily {

    @State() calories = '0';
    @State() name = '';
    @State() imgUrl;
    header = '';
    foodItem: IFoodItem = {
        name: '',
        barcode: '',
        picture: '',
        servingPerContainer: '0',
        servingSize: {
            size: '0',
            grams: '0',
            measurement: '',
        },
        calories: '0',
        fat: {
            total: {
                grams: '0',
                percent: '0',
            },
            saturated: {
                grams: '0',
                percent: '0',
            },
            trans: {
                grams: '0',
                percent: '0',
            },
            polyunsaturated: {
                grams: '0',
                percent: '0',
            },
            monounsaturated: {
                grams: '0',
                percent: '0',
            },
        },
        cholesterol: {
            grams: '0',
            percent: '0',
        },
        sodium: {
            grams: '0',
            percent: '0',
        },
        potassium: {
            grams: '0',
            percent: '0',
        },
        totalCarbohydrates: {
            grams: '0',
            percent: '0',
        },
        dietaryFiber: {
            grams: '0',
            percent: '0',
        },
        protein: {
            grams: '0',
            percent: '0',
        },
        niacin: {
            grams: '0',
            percent: '0',
        },
        phosphorus: {
            grams: '0',
            percent: '0',
        },
        calcium: {
            grams: '0',
            percent: '0',
        },
        iron: {
            grams: '0',
            percent: '0',
        },
        magnesium: {
            grams: '0',
            percent: '0',
        },
        manganese: {
            grams: '0',
            percent: '0',
        },
        dateCreated: null,
        vitamin: {
            A: {
                grams: '0',
                percent: '0',
            },
            B: {
                grams: '0',
                percent: '0',
            },
            C: {
                grams: '0',
                percent: '0',
            },
            D: {
                grams: '0',
                percent: '0',
            },
            E: {
                grams: '0',
                percent: '0',
            },
        },
        sugar: {
            added: {
                grams: '0',
                percent: '0',
            },
            total: {
                grams: '0',
                percent: '0',
            }
        },
        sugarAlcohol: {
            added: {
                grams: '0',
                percent: '0',
            },
            total: {
                grams: '0',
                percent: '0',
            }
        }

    };
    path: string = '';
    selectItems = [
        'gram',
        'tbsp',
        'cup',
        'pint',
        'quart',
        'container',
        'kg',
        'lb',
        'oz',
        'slice',
        'large',
        'tsp',
        'package',
        'link',
        'inch',
        'medium',
        'serving',
        'piece',
        'bottle',
        'can',
        'scoop'
    ];

    componentWillLoad() {
        this.changeHeader();
        window.location.hash = '';
        window.onhashchange = () => this.goBack();
    }

    componentDidLoad() {
        const ionSelect = document.querySelector('ion-select');
        ionSelect.addEventListener('ionChange', (ev) => {
            this.foodItem.servingSize.measurement = ev['detail'].value;

        });
    }

    changeHeader() {
        const modalElement = document.querySelector('ion-modal');
        this.path = modalElement.componentProps.mode;
        if (this.path === 'create') {
            this.header = 'Add a new food product!'
        } else {
            this.getProductData(modalElement.componentProps.$loki);
        }
    }

    async goBack() {
        const modal = document.querySelector('ion-modal-controller');
        await modal.dismiss();
    }

    async getProductData($loki: number) {
        const response = getFoodProduct($loki);
        if (response.success) {
            this.foodItem = {
                ...this.foodItem,
                ...response.data
            }
            this.name = this.foodItem.name;
            this.calories = this.foodItem.calories;
            this.header = `Edit ${foodNameToUppercase(this.foodItem.name)}!`;
            const image = await readImageFile(this.foodItem.name);
            this.imgUrl = image.data;
        } else {
            console.error(response.error);
        }
    }


    getFormData(opts: { prop: string, value: string }) {

        switch (opts.prop) {
            case foodFormControls.servingSizeAmount:
                this.foodItem.servingSize.size = opts.value;
                if (!this.foodItem.servingSize.size) {
                    this.foodItem.servingSize.size = '0';
                }
                break;
            case foodFormControls.servingSizeGrams:
                this.foodItem.servingSize.grams = opts.value;
                if (!this.foodItem.servingSize.grams) {
                    this.foodItem.servingSize.grams = '0';
                }
                break;
            case foodFormControls.servingPerContainer:
                this.foodItem.servingPerContainer = opts.value;
                if (!this.foodItem.servingPerContainer) {
                    this.foodItem.servingPerContainer = '0';
                }
                break;

            case foodFormControls.totalFatGrams:
                this.foodItem.fat.total.grams = opts.value;
                if (!this.foodItem.fat.total.grams) {
                    this.foodItem.fat.total.grams = '0';
                }
                break;

            case foodFormControls.totalFatPercent:
                this.foodItem.fat.total.percent = opts.value;
                if (!this.foodItem.fat.total.percent) {
                    this.foodItem.fat.total.percent = '0';
                }
                break;

            case foodFormControls.saturatedFatGrams:
                this.foodItem.fat.saturated.grams = opts.value;
                if (!this.foodItem.fat.saturated.grams) {
                    this.foodItem.fat.saturated.grams = '0';
                }
                break;

            case foodFormControls.saturatedFatPercent:
                this.foodItem.fat.saturated.percent = opts.value;
                if (!this.foodItem.fat.saturated.percent) {
                    this.foodItem.fat.saturated.percent = '0';
                }
                break;

            case foodFormControls.transFatGrams:
                this.foodItem.fat.trans.grams = opts.value;
                if (!this.foodItem.fat.trans.grams) {
                    this.foodItem.fat.trans.grams = '0';
                }
                break;

            case foodFormControls.transFatPercent:
                this.foodItem.fat.trans.percent = opts.value;
                if (!this.foodItem.fat.trans.percent) {
                    this.foodItem.fat.trans.percent = '0';
                }
                break;

            case foodFormControls.polyunsaturatedFatGrams:
                this.foodItem.fat.polyunsaturated.grams = opts.value;
                if (!this.foodItem.fat.polyunsaturated.grams) {
                    this.foodItem.fat.polyunsaturated.grams = '0';
                }
                break;

            case foodFormControls.polyunsaturatedFatPercent:
                this.foodItem.fat.polyunsaturated.percent = opts.value;
                if (!this.foodItem.fat.polyunsaturated.percent) {
                    this.foodItem.fat.polyunsaturated.percent = '0';
                }
                break;

            case foodFormControls.monounsaturatedFatGrams:
                this.foodItem.fat.monounsaturated.grams = opts.value;
                if (!this.foodItem.fat.monounsaturated.grams) {
                    this.foodItem.fat.monounsaturated.grams = '0';
                }
                break;

            case foodFormControls.monounsaturatedFatPercent:
                this.foodItem.fat.monounsaturated.percent = opts.value;
                if (!this.foodItem.fat.monounsaturated.percent) {
                    this.foodItem.fat.monounsaturated.percent = '0';
                }
                break;

            case foodFormControls.cholesterolGrams:
                this.foodItem.cholesterol.grams = opts.value;
                if (!this.foodItem.cholesterol.grams) {
                    this.foodItem.cholesterol.grams = '0';
                }
                break;

            case foodFormControls.cholesterolPercent:
                this.foodItem.cholesterol.percent = opts.value;
                if (!this.foodItem.cholesterol.percent) {
                    this.foodItem.cholesterol.percent = '0';
                }
                break;

            case foodFormControls.sodiumGrams:
                this.foodItem.sodium.grams = opts.value;
                if (!this.foodItem.sodium.grams) {
                    this.foodItem.sodium.grams = '0';
                }
                break;

            case foodFormControls.sodiumPercent:
                this.foodItem.sodium.percent = opts.value;
                if (!this.foodItem.sodium.percent) {
                    this.foodItem.sodium.percent = '0';
                }
                break;

            case foodFormControls.potassiumGrams:
                this.foodItem.potassium.grams = opts.value;
                if (!this.foodItem.potassium.grams) {
                    this.foodItem.potassium.grams = '0';
                }
                break;

            case foodFormControls.potassiumPercent:
                this.foodItem.potassium.percent = opts.value;
                if (!this.foodItem.potassium.percent) {
                    this.foodItem.potassium.percent = '0';
                }
                break;

            case foodFormControls.totalCarbohydratesGrams:
                this.foodItem.totalCarbohydrates.grams = opts.value;
                if (!this.foodItem.totalCarbohydrates.grams) {
                    this.foodItem.totalCarbohydrates.grams = '0';
                }
                break;

            case foodFormControls.totalCarbohydratesPercent:
                this.foodItem.totalCarbohydrates.percent = opts.value;
                if (!this.foodItem.totalCarbohydrates.percent) {
                    this.foodItem.totalCarbohydrates.percent = '0';
                }
                break;

            case foodFormControls.dietaryFiberGrams:
                this.foodItem.dietaryFiber.grams = opts.value;
                if (!this.foodItem.dietaryFiber.grams) {
                    this.foodItem.dietaryFiber.grams = '0';
                }
                break;

            case foodFormControls.dietaryFiberPercent:
                this.foodItem.dietaryFiber.percent = opts.value;
                if (!this.foodItem.dietaryFiber.percent) {
                    this.foodItem.dietaryFiber.percent = '0';
                }
                break;

            case foodFormControls.proteinGrams:
                this.foodItem.protein.grams = opts.value;
                if (!this.foodItem.protein.grams) {
                    this.foodItem.protein.grams = '0';
                }
                break;

            case foodFormControls.proteinPercent:
                this.foodItem.protein.percent = opts.value;
                if (!this.foodItem.protein.grams) {
                    this.foodItem.protein.grams = '0';
                }
                break;

            case foodFormControls.niacinGrams:
                this.foodItem.niacin.grams = opts.value;
                if (!this.foodItem.niacin.grams) {
                    this.foodItem.niacin.grams = '0';
                }
                break;

            case foodFormControls.niacinPercent:
                this.foodItem.niacin.percent = opts.value;
                if (!this.foodItem.niacin.percent) {
                    this.foodItem.niacin.percent = '0';
                }
                break;

            case foodFormControls.phosphorusGrams:
                this.foodItem.phosphorus.grams = opts.value;
                if (!this.foodItem.phosphorus.grams) {
                    this.foodItem.phosphorus.grams = '0';
                }
                break;

            case foodFormControls.phosphorusPercent:
                this.foodItem.phosphorus.percent = opts.value;
                if (!this.foodItem.phosphorus.percent) {
                    this.foodItem.phosphorus.percent = '0';
                }
                break;

            case foodFormControls.calciumGrams:
                this.foodItem.calcium.grams = opts.value;
                if (!this.foodItem.calcium.grams) {
                    this.foodItem.calcium.grams = '0';
                }
                break;

            case foodFormControls.calciumPercent:
                this.foodItem.calcium.percent = opts.value;
                if (!this.foodItem.calcium.percent) {
                    this.foodItem.calcium.percent = '0';
                }
                break;

            case foodFormControls.ironGrams:
                this.foodItem.iron.grams = opts.value;
                if (!this.foodItem.iron.grams) {
                    this.foodItem.iron.grams = '0';
                }
                break;

            case foodFormControls.ironPercent:
                this.foodItem.iron.percent = opts.value;
                if (!this.foodItem.iron.percent) {
                    this.foodItem.iron.percent = '0';
                }
                break;

            case foodFormControls.magnesiumGrams:
                this.foodItem.magnesium.grams = opts.value;
                if (!this.foodItem.magnesium.grams) {
                    this.foodItem.magnesium.grams = '0';
                }
                break;

            case foodFormControls.magnesiumPercent:
                this.foodItem.magnesium.percent = opts.value;
                if (!this.foodItem.magnesium.percent) {
                    this.foodItem.magnesium.percent = '0';
                }
                break;

            case foodFormControls.manganeseGrams:
                this.foodItem.manganese.grams = opts.value;
                if (!this.foodItem.manganese.grams) {
                    this.foodItem.manganese.grams = '0';
                }
                break;

            case foodFormControls.manganesePercent:
                this.foodItem.manganese.percent = opts.value;
                if (!this.foodItem.manganese.percent) {
                    this.foodItem.manganese.percent = '0';
                }
                break;

            case foodFormControls.vitaminAGrams:
                this.foodItem.vitamin.A.grams = opts.value;
                if (!this.foodItem.vitamin.A.grams) {
                    this.foodItem.vitamin.A.grams = '0';
                }
                break;

            case foodFormControls.vitaminAPercent:
                this.foodItem.vitamin.A.percent = opts.value;
                if (!this.foodItem.vitamin.A.grams) {
                    this.foodItem.vitamin.A.grams = '0';
                }
                break;

            case foodFormControls.vitaminBGrams:
                this.foodItem.vitamin.B.grams = opts.value;
                if (!this.foodItem.vitamin.B.grams) {
                    this.foodItem.vitamin.B.grams = '0';
                }
                break;

            case foodFormControls.vitaminBPercent:
                this.foodItem.vitamin.B.percent = opts.value;
                if (!this.foodItem.vitamin.B.percent) {
                    this.foodItem.vitamin.B.percent = '0';
                }
                break;

            case foodFormControls.vitaminCGrams:
                this.foodItem.vitamin.C.grams = opts.value;
                if (!this.foodItem.vitamin.C.grams) {
                    this.foodItem.vitamin.C.grams = '0';
                }
                break;

            case foodFormControls.vitaminCPercent:
                this.foodItem.vitamin.C.percent = opts.value;
                if (!this.foodItem.vitamin.C.percent) {
                    this.foodItem.vitamin.C.percent = '0';
                }
                break;

            case foodFormControls.vitaminDGrams:
                this.foodItem.vitamin.D.grams = opts.value;
                if (!this.foodItem.vitamin.D.grams) {
                    this.foodItem.vitamin.D.grams = '0';
                }
                break;

            case foodFormControls.vitaminDPercent:
                this.foodItem.vitamin.D.percent = opts.value;
                if (!this.foodItem.vitamin.D.percent) {
                    this.foodItem.vitamin.D.percent = '0';
                }
                break;

            case foodFormControls.vitaminEGrams:
                this.foodItem.vitamin.E.grams = opts.value;
                if (!this.foodItem.vitamin.E.grams) {
                    this.foodItem.vitamin.E.grams = '0';
                }
                break;

            case foodFormControls.vitaminEPercent:
                this.foodItem.vitamin.E.percent = opts.value;
                if (!this.foodItem.vitamin.E.percent) {
                    this.foodItem.vitamin.E.percent = '0';
                }
                break;

            case foodFormControls.sugarTotalGrams:
                this.foodItem.sugar.total.grams = opts.value;
                if (!this.foodItem.sugar.total.grams) {
                    this.foodItem.sugar.total.grams = '0';
                }
                break;

            case foodFormControls.sugarTotalPercent:
                this.foodItem.sugar.total.percent = opts.value;
                if (!this.foodItem.sugar.total.percent) {
                    this.foodItem.sugar.total.percent = '0';
                }
                break;

            case foodFormControls.sugarAddedGrams:
                this.foodItem.sugar.added.grams = opts.value;
                if (!this.foodItem.sugar.added.grams) {
                    this.foodItem.sugar.added.grams = '0';
                }
                break;

            case foodFormControls.sugarAddedPercent:
                this.foodItem.sugar.added.percent = opts.value;
                if (!this.foodItem.sugar.added.percent) {
                    this.foodItem.sugar.added.percent = '0';
                }
                break;

            case foodFormControls.sugarAlcoholTotalGrams:
                this.foodItem.sugarAlcohol.total.grams = opts.value;
                if (!this.foodItem.sugarAlcohol.total.grams) {
                    this.foodItem.sugarAlcohol.total.grams = '0';
                }
                break;

            case foodFormControls.sugarAlcoholTotalPercent:
                this.foodItem.sugarAlcohol.total.percent = opts.value;
                if (!this.foodItem.sugarAlcohol.total.percent) {
                    this.foodItem.sugarAlcohol.total.percent = '0';
                }
                break;

            case foodFormControls.sugarAlcoholAddedGrams:
                this.foodItem.sugarAlcohol.added.grams = opts.value;
                if (!this.foodItem.sugarAlcohol.added.grams) {
                    this.foodItem.sugarAlcohol.added.grams = '0';
                }
                break;

            case foodFormControls.sugarAlcoholAddedPercent:
                this.foodItem.sugarAlcohol.added.percent = opts.value;
                if (!this.foodItem.sugarAlcohol.added.percent) {
                    this.foodItem.sugarAlcohol.added.percent = '0';
                }
                break;

        }

    }

    async getPicture() {
        if (navigator.userAgent.toLowerCase().match('mobile')) {
            const image = await Camera.getPhoto({
                quality: 100,
                allowEditing: false,
                resultType: CameraResultType.Uri,
                source: CameraSource.Prompt
            });
            this.imgUrl = image.webPath;

        } else {
            const image = await Camera.getPhoto({
                quality: 100,
                allowEditing: false,
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Prompt
            });
            this.imgUrl = image.dataUrl;
        }
    }

    getBarcode() {
        console.log('click Barcode')
    }

    createEditFoodProd() {
        if (!this.calories) {
            this.calories = '0';
        };
        if (!this.foodItem.servingSize.measurement) {
            this.foodItem.servingSize.measurement = 'gram';
        }
        const foodItem: IFoodItem = {
            ...this.foodItem,
            dateCreated: new Date(),
            name: this.name.toLowerCase(),
            calories: this.calories,
            picture: `images/${this.foodItem.name}.png`
        };
        const response = insertOrUpdateFoodProduct(foodItem);
        if (response.success) {
            writeImageFile({ name: this.foodItem.name, data: this.imgUrl });
            this.displayMessage({
                header: 'Success!',
                message: response.message,
                event: this.goBack
            });
        } else {
            this.displayMessage({
                header: 'Error!',
                message: response.error
            });
        }
    }

    deleteFoodProd() {
        const response = deleteFoodProduct(this.foodItem);
        if (response.success) {
            this.displayMessage({
                header: 'Success!',
                message: response.message,
                event: this.goBack
            });
        } else {
            this.displayMessage({
                header: 'Error!',
                message: response.error
            });
        }

    }

    async displayMessage(opts: {
        header: string,
        subHeader?: string,
        message: string,
        event?
    }) {
        const alertController = document.querySelector('ion-alert-controller');
        const alert = await alertController.create({
            header: opts.header,
            subHeader: opts.subHeader,
            message: opts.message,
            buttons: [{
                text: 'OK',
                handler: () => {
                    if (opts.event) {
                        opts.event();
                    }
                }
            }]
        });
        await alert.present();
    }

    async askIfWantToSave(control?: string) {
        const alertController = document.querySelector('ion-alert-controller');
        let message;
        if (control === 'create') {
            message = 'Do you want to save this product?'
        } else if (control === 'edit') {
            message = `Do you want to edit ${foodNameToUppercase(this.name)}`;
        } else {
            message = `Do you want to delete ${foodNameToUppercase(this.name)}`;
        }
        const alert = await alertController.create({
            header: 'Warning!',
            message: message,
            buttons: [{
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary'
            }, {
                text: 'OK',
                handler: () => {
                    if (!control) {
                        this.deleteFoodProd();
                    } else {
                        this.createEditFoodProd();
                    }
                }
            }]
        });
        await alert.present();
    }

    render() {
        return [
            <ion-alert-controller></ion-alert-controller>,
            <div>
                {
                    navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
                        ? ''
                        : <ion-header>
                            <ion-toolbar color="primary">
                                <ion-buttons slot="start">
                                    <ion-button onClick={() => this.goBack()} >
                                        <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
                                    </ion-button>
                                </ion-buttons>
                                {
                                    this.name && (this.calories || this.calories === '0')
                                        ? <ion-buttons slot="end">
                                            {this.path === 'create'
                                                ? <ion-button onClick={() => this.askIfWantToSave('create')}>Create</ion-button>
                                                : <div>
                                                    <ion-button onClick={() => this.askIfWantToSave()}>Delete</ion-button>
                                                    <ion-button onClick={() => this.askIfWantToSave('edit')}>Edit</ion-button>
                                                </div>
                                            }
                                        </ion-buttons>
                                        : ''
                                }
                            </ion-toolbar>
                        </ion-header>
                }
            </div>,
            <ion-content class="ion-padding">
                <form>
                    <ion-list>
                        <h1>{this.header}</h1>
                        <div  id="button" >
                            <img src={this.imgUrl} />
                            <ion-button size="large" fill="clear" onClick={this.getPicture.bind(this)}>
                                <ion-icon slot="icon-only" name="camera"></ion-icon>
                            </ion-button>
                            {/* <p>Take a photo or choose one picture from the album.</p> */}
                        </div>
                        {
                            this.path === 'edit'
                                ? <ion-item>
                                    <ion-input value={this.foodItem.barcode} type="text" readonly></ion-input>
                                </ion-item>
                                : <ion-item>
                                    <ion-input type="text" readonly></ion-input>
                                    <ion-button size="large" fill="clear" onClick={this.getBarcode.bind(this)}>
                                        <ion-icon slot="icon-only" name="barcode"></ion-icon>
                                    </ion-button>
                                </ion-item>
                        }
                        <ion-item>
                            <ion-label position="floating">Name</ion-label>
                            <ion-input value={this.foodItem.name} onInput={e => this.name = e.target['value']} type="text" required></ion-input>
                        </ion-item>

                        <h3>Nutrition Facts</h3>
                        <ion-item>
                            <ion-label position="floating">Calories</ion-label>
                            <ion-input value={this.calories.toString()} onInput={e => this.calories = e.target['value']} type="number" required></ion-input>
                        </ion-item>


                        <ion-item-group>
                            <h5>Servings</h5>
                            <ion-item>
                                <ion-label position="floating">Size</ion-label>
                                <ion-input value={this.foodItem.servingSize.size.toString()} onInput={e => this.getFormData({ prop: foodFormControls.servingSizeAmount, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.servingSize.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.servingSizeGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label>Measurement</ion-label>

                                <ion-select value={this.foodItem.servingSize.measurement} multiple={false} placeholder="Select Measurement if amount is specified">
                                    {
                                        this.selectItems.map(item =>
                                            <ion-select-option value={item}>{item}</ion-select-option>
                                        )
                                    }
                                </ion-select>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Per container</ion-label>
                                <ion-input
                                    value={this.foodItem.servingPerContainer.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.servingPerContainer, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h6>Total Fat</h6>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.fat.total.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.totalFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.fat.total.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.totalFatPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>
                        <ion-item-group>
                            <h6>Saturated Fat</h6>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.fat.saturated.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.saturatedFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.fat.saturated.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.saturatedFatPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>
                        <ion-item-group>
                            <h6>Trans Fat</h6>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.fat.trans.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.transFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.fat.trans.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.transFatPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>
                        <ion-item-group>
                            <h6>MonoUnsaturated Fat</h6>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.fat.monounsaturated.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.monounsaturatedFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.fat.monounsaturated.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.monounsaturatedFatPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>
                        <ion-item-group>
                            <h6>PolySaturated Fat</h6>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.fat.polyunsaturated.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.polyunsaturatedFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.fat.polyunsaturated.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.polyunsaturatedFatPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Cholesterol</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.cholesterol.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.cholesterolGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.cholesterol.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.cholesterolPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Sodium</h5>
                            <ion-item>
                                <ion-label position="floating">Milligrams</ion-label>
                                <ion-input
                                    value={this.foodItem.sodium.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.sodiumGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.sodium.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.sodiumPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>


                        <ion-item-group>
                            <h5>Potassium</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.potassium.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.potassiumGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.potassium.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.potassiumPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>


                        <ion-item-group>
                            <h5>Total Carbohydrates</h5>
                            <ion-item>
                                <ion-label position="floating">Milligrams</ion-label>
                                <ion-input
                                    value={this.foodItem.totalCarbohydrates.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.totalCarbohydratesGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.totalCarbohydrates.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.totalCarbohydratesPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>


                        <ion-item-group>
                            <h5>Dietary Fiber</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.dietaryFiber.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.dietaryFiberGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.dietaryFiber.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.dietaryFiberPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Protein</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.protein.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.proteinGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.protein.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.proteinPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Sugar</h5>
                            <ion-item-group class="ion-margin-horizontal">
                                <h6>Total</h6>
                                <ion-item>
                                    <ion-label position="floating">Grams</ion-label>
                                    <ion-input
                                        value={this.foodItem.sugar.total.grams.toString()}
                                        onInput={e => this.getFormData({ prop: foodFormControls.sugarTotalGrams, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label position="floating">Percent</ion-label>
                                    <ion-input
                                        value={this.foodItem.sugar.total.percent.toString()}
                                        onInput={e => this.getFormData({ prop: foodFormControls.sugarTotalPercent, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                            </ion-item-group>
                            <ion-item-group class="ion-margin-horizontal">
                                <h6>Added</h6>
                                <ion-item>
                                    <ion-label position="floating">Grams</ion-label>
                                    <ion-input
                                        value={this.foodItem.sugar.added.grams.toString()}
                                        onInput={e => this.getFormData({ prop: foodFormControls.sugarAddedGrams, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label position="floating">Percent</ion-label>
                                    <ion-input
                                        value={this.foodItem.sugar.added.percent.toString()}
                                        onInput={e => this.getFormData({ prop: foodFormControls.sugarAddedPercent, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                            </ion-item-group>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Sugar Alcohol</h5>
                            <ion-item-group class="ion-margin-horizontal">
                                <h6>Total</h6>
                                <ion-item>
                                    <ion-label position="floating">Grams</ion-label>
                                    <ion-input
                                        value={this.foodItem.sugarAlcohol.total.grams.toString()}
                                        onInput={e => this.getFormData({ prop: foodFormControls.sugarAlcoholTotalGrams, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label position="floating">Percent</ion-label>
                                    <ion-input
                                        value={this.foodItem.sugarAlcohol.total.percent.toString()}
                                        onInput={e => this.getFormData({ prop: foodFormControls.sugarAlcoholTotalPercent, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                            </ion-item-group>
                            <ion-item-group class="ion-margin-horizontal">
                                <h6>Added</h6>
                                <ion-item>
                                    <ion-label position="floating">Grams</ion-label>
                                    <ion-input
                                        value={this.foodItem.sugarAlcohol.added.grams.toString()}
                                        onInput={e => this.getFormData({ prop: foodFormControls.sugarAlcoholAddedGrams, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label position="floating">Percent</ion-label>
                                    <ion-input
                                        value={this.foodItem.sugarAlcohol.added.percent.toString()}
                                        onInput={e => this.getFormData({ prop: foodFormControls.sugarAlcoholAddedPercent, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                            </ion-item-group>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Niacin</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.niacin.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.niacinGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.niacin.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.niacinPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Phosphorus</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.phosphorus.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.phosphorusGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.phosphorus.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.phosphorusPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>


                        <ion-item-group>
                            <h5>Calcium</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.calcium.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.calciumGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.calcium.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.calciumPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>


                        <ion-item-group>
                            <h5>Iron</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.iron.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.ironGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.iron.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.ironPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Magnesium</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.magnesium.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.magnesiumGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.magnesium.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.magnesiumPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Manganese</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.manganese.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.manganeseGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.manganese.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.manganesePercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Vitamin A</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.vitamin.A.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.vitaminAGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.vitamin.A.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.vitaminAGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Vitamin B</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.vitamin.B.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.vitaminBGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.vitamin.B.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.vitaminBPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Vitamin C</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.vitamin.C.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.vitaminCGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.vitamin.C.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.vitaminCPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Vitamin D</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.vitamin.D.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.vitaminDGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.vitamin.D.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.vitaminDPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Vitamin E</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.vitamin.E.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.vitaminEGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.vitamin.E.percent.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.vitaminEPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>
                    </ion-list>
                </form>
            </ion-content>,
            <div>
                {
                    navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
                        ? <ion-footer>
                            <ion-toolbar color="primary">
                                <ion-buttons slot="start">
                                    <ion-button onClick={() => this.goBack()}>
                                        <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
                                    </ion-button>
                                </ion-buttons>
                                {
                                    this.name && this.calories || this.calories === '0' || this.foodItem.calories
                                        ? <ion-buttons slot="end">
                                            {this.path === 'create'
                                                ? <ion-button onClick={() => this.askIfWantToSave('create')}>Create</ion-button>
                                                : <div>
                                                    <ion-button onClick={() => this.askIfWantToSave()}>Delete</ion-button>
                                                    <ion-button onClick={() => this.askIfWantToSave('edit')}>Edit</ion-button>
                                                </div>
                                            }
                                        </ion-buttons>
                                        : ''
                                }
                            </ion-toolbar>
                        </ion-footer>
                        : ''
                }
            </div>
        ];
    }
}
