import { Component, h, State } from "@stencil/core";
import { IFoodProduct } from "../../interfaces";
import { toUpperCase } from '../../helpers/utils';
import { insertOrUpdateFoodProduct, deleteFoodProduct } from "../../services/db";
import { writeImageFile, readImageFile } from "../../services/filesystem";
import { alertController, modalController } from "@ionic/core";
import { scan, stopScan } from "../../services/quagga";

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
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
    foodProduct: IFoodProduct = {
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

    toggleBarcode = true;

    componentWillLoad() {
        this.changeHeader();
        window.location.hash = '';
        window.onhashchange = () => this.goBack();
    }

    componentDidLoad() {
        const ionSelect = document.querySelector('ion-select');
        ionSelect.addEventListener('ionChange', (ev) => {
            this.foodProduct.servingSize.measurement = ev['detail'].value;
        });
    }

    async changeHeader() {
        const modalElement = document.querySelector('ion-modal');
        this.path = modalElement.componentProps.mode;
        if (this.path === 'create') {
            this.header = 'Add a new food product!'
        } else {
            this.foodProduct = modalElement.componentProps.foodProduct;
            this.name = this.foodProduct.name;
            this.calories = this.foodProduct.calories;
            this.header = `Edit ${toUpperCase(this.foodProduct.name)}!`;
            let image;
            try {
                image = await readImageFile(this.foodProduct.name);
            } catch (error) {
                image = '';
            }
            this.imgUrl = image.data;
        }
    }

    async goBack() {
        await modalController.dismiss();
    }

    async getProductData(foodProduct: IFoodProduct) {
        this.foodProduct = foodProduct;
        this.name = this.foodProduct.name;
        this.calories = this.foodProduct.calories;
        this.header = `Edit ${toUpperCase(this.foodProduct.name)}!`;
        let image;
        try {
            image = await readImageFile(this.foodProduct.name);
        } catch (error) {
            image = '';
        }
        this.imgUrl = image.data;
    }


    getFormData(opts: { prop: string, value: string }) {

        switch (opts.prop) {
            case foodFormControls.servingSizeAmount:
                this.foodProduct.servingSize.size = opts.value;
                if (!this.foodProduct.servingSize.size) {
                    this.foodProduct.servingSize.size = '0';
                }
                break;
            case foodFormControls.servingSizeGrams:
                this.foodProduct.servingSize.grams = opts.value;
                if (!this.foodProduct.servingSize.grams) {
                    this.foodProduct.servingSize.grams = '0';
                }
                break;
            case foodFormControls.servingPerContainer:
                this.foodProduct.servingPerContainer = opts.value;
                if (!this.foodProduct.servingPerContainer) {
                    this.foodProduct.servingPerContainer = '0';
                }
                break;

            case foodFormControls.totalFatGrams:
                this.foodProduct.fat.total.grams = opts.value;
                if (!this.foodProduct.fat.total.grams) {
                    this.foodProduct.fat.total.grams = '0';
                }
                break;

            case foodFormControls.totalFatPercent:
                this.foodProduct.fat.total.percent = opts.value;
                if (!this.foodProduct.fat.total.percent) {
                    this.foodProduct.fat.total.percent = '0';
                }
                break;

            case foodFormControls.saturatedFatGrams:
                this.foodProduct.fat.saturated.grams = opts.value;
                if (!this.foodProduct.fat.saturated.grams) {
                    this.foodProduct.fat.saturated.grams = '0';
                }
                break;

            case foodFormControls.saturatedFatPercent:
                this.foodProduct.fat.saturated.percent = opts.value;
                if (!this.foodProduct.fat.saturated.percent) {
                    this.foodProduct.fat.saturated.percent = '0';
                }
                break;

            case foodFormControls.transFatGrams:
                this.foodProduct.fat.trans.grams = opts.value;
                if (!this.foodProduct.fat.trans.grams) {
                    this.foodProduct.fat.trans.grams = '0';
                }
                break;

            case foodFormControls.transFatPercent:
                this.foodProduct.fat.trans.percent = opts.value;
                if (!this.foodProduct.fat.trans.percent) {
                    this.foodProduct.fat.trans.percent = '0';
                }
                break;

            case foodFormControls.polyunsaturatedFatGrams:
                this.foodProduct.fat.polyunsaturated.grams = opts.value;
                if (!this.foodProduct.fat.polyunsaturated.grams) {
                    this.foodProduct.fat.polyunsaturated.grams = '0';
                }
                break;

            case foodFormControls.polyunsaturatedFatPercent:
                this.foodProduct.fat.polyunsaturated.percent = opts.value;
                if (!this.foodProduct.fat.polyunsaturated.percent) {
                    this.foodProduct.fat.polyunsaturated.percent = '0';
                }
                break;

            case foodFormControls.monounsaturatedFatGrams:
                this.foodProduct.fat.monounsaturated.grams = opts.value;
                if (!this.foodProduct.fat.monounsaturated.grams) {
                    this.foodProduct.fat.monounsaturated.grams = '0';
                }
                break;

            case foodFormControls.monounsaturatedFatPercent:
                this.foodProduct.fat.monounsaturated.percent = opts.value;
                if (!this.foodProduct.fat.monounsaturated.percent) {
                    this.foodProduct.fat.monounsaturated.percent = '0';
                }
                break;

            case foodFormControls.cholesterolGrams:
                this.foodProduct.cholesterol.grams = opts.value;
                if (!this.foodProduct.cholesterol.grams) {
                    this.foodProduct.cholesterol.grams = '0';
                }
                break;

            case foodFormControls.cholesterolPercent:
                this.foodProduct.cholesterol.percent = opts.value;
                if (!this.foodProduct.cholesterol.percent) {
                    this.foodProduct.cholesterol.percent = '0';
                }
                break;

            case foodFormControls.sodiumGrams:
                this.foodProduct.sodium.grams = opts.value;
                if (!this.foodProduct.sodium.grams) {
                    this.foodProduct.sodium.grams = '0';
                }
                break;

            case foodFormControls.sodiumPercent:
                this.foodProduct.sodium.percent = opts.value;
                if (!this.foodProduct.sodium.percent) {
                    this.foodProduct.sodium.percent = '0';
                }
                break;

            case foodFormControls.potassiumGrams:
                this.foodProduct.potassium.grams = opts.value;
                if (!this.foodProduct.potassium.grams) {
                    this.foodProduct.potassium.grams = '0';
                }
                break;

            case foodFormControls.potassiumPercent:
                this.foodProduct.potassium.percent = opts.value;
                if (!this.foodProduct.potassium.percent) {
                    this.foodProduct.potassium.percent = '0';
                }
                break;

            case foodFormControls.totalCarbohydratesGrams:
                this.foodProduct.totalCarbohydrates.grams = opts.value;
                if (!this.foodProduct.totalCarbohydrates.grams) {
                    this.foodProduct.totalCarbohydrates.grams = '0';
                }
                break;

            case foodFormControls.totalCarbohydratesPercent:
                this.foodProduct.totalCarbohydrates.percent = opts.value;
                if (!this.foodProduct.totalCarbohydrates.percent) {
                    this.foodProduct.totalCarbohydrates.percent = '0';
                }
                break;

            case foodFormControls.dietaryFiberGrams:
                this.foodProduct.dietaryFiber.grams = opts.value;
                if (!this.foodProduct.dietaryFiber.grams) {
                    this.foodProduct.dietaryFiber.grams = '0';
                }
                break;

            case foodFormControls.dietaryFiberPercent:
                this.foodProduct.dietaryFiber.percent = opts.value;
                if (!this.foodProduct.dietaryFiber.percent) {
                    this.foodProduct.dietaryFiber.percent = '0';
                }
                break;

            case foodFormControls.proteinGrams:
                this.foodProduct.protein.grams = opts.value;
                if (!this.foodProduct.protein.grams) {
                    this.foodProduct.protein.grams = '0';
                }
                break;

            case foodFormControls.proteinPercent:
                this.foodProduct.protein.percent = opts.value;
                if (!this.foodProduct.protein.grams) {
                    this.foodProduct.protein.grams = '0';
                }
                break;

            case foodFormControls.niacinGrams:
                this.foodProduct.niacin.grams = opts.value;
                if (!this.foodProduct.niacin.grams) {
                    this.foodProduct.niacin.grams = '0';
                }
                break;

            case foodFormControls.niacinPercent:
                this.foodProduct.niacin.percent = opts.value;
                if (!this.foodProduct.niacin.percent) {
                    this.foodProduct.niacin.percent = '0';
                }
                break;

            case foodFormControls.phosphorusGrams:
                this.foodProduct.phosphorus.grams = opts.value;
                if (!this.foodProduct.phosphorus.grams) {
                    this.foodProduct.phosphorus.grams = '0';
                }
                break;

            case foodFormControls.phosphorusPercent:
                this.foodProduct.phosphorus.percent = opts.value;
                if (!this.foodProduct.phosphorus.percent) {
                    this.foodProduct.phosphorus.percent = '0';
                }
                break;

            case foodFormControls.calciumGrams:
                this.foodProduct.calcium.grams = opts.value;
                if (!this.foodProduct.calcium.grams) {
                    this.foodProduct.calcium.grams = '0';
                }
                break;

            case foodFormControls.calciumPercent:
                this.foodProduct.calcium.percent = opts.value;
                if (!this.foodProduct.calcium.percent) {
                    this.foodProduct.calcium.percent = '0';
                }
                break;

            case foodFormControls.ironGrams:
                this.foodProduct.iron.grams = opts.value;
                if (!this.foodProduct.iron.grams) {
                    this.foodProduct.iron.grams = '0';
                }
                break;

            case foodFormControls.ironPercent:
                this.foodProduct.iron.percent = opts.value;
                if (!this.foodProduct.iron.percent) {
                    this.foodProduct.iron.percent = '0';
                }
                break;

            case foodFormControls.magnesiumGrams:
                this.foodProduct.magnesium.grams = opts.value;
                if (!this.foodProduct.magnesium.grams) {
                    this.foodProduct.magnesium.grams = '0';
                }
                break;

            case foodFormControls.magnesiumPercent:
                this.foodProduct.magnesium.percent = opts.value;
                if (!this.foodProduct.magnesium.percent) {
                    this.foodProduct.magnesium.percent = '0';
                }
                break;

            case foodFormControls.manganeseGrams:
                this.foodProduct.manganese.grams = opts.value;
                if (!this.foodProduct.manganese.grams) {
                    this.foodProduct.manganese.grams = '0';
                }
                break;

            case foodFormControls.manganesePercent:
                this.foodProduct.manganese.percent = opts.value;
                if (!this.foodProduct.manganese.percent) {
                    this.foodProduct.manganese.percent = '0';
                }
                break;

            case foodFormControls.vitaminAGrams:
                this.foodProduct.vitamin.A.grams = opts.value;
                if (!this.foodProduct.vitamin.A.grams) {
                    this.foodProduct.vitamin.A.grams = '0';
                }
                break;

            case foodFormControls.vitaminAPercent:
                this.foodProduct.vitamin.A.percent = opts.value;
                if (!this.foodProduct.vitamin.A.grams) {
                    this.foodProduct.vitamin.A.grams = '0';
                }
                break;

            case foodFormControls.vitaminBGrams:
                this.foodProduct.vitamin.B.grams = opts.value;
                if (!this.foodProduct.vitamin.B.grams) {
                    this.foodProduct.vitamin.B.grams = '0';
                }
                break;

            case foodFormControls.vitaminBPercent:
                this.foodProduct.vitamin.B.percent = opts.value;
                if (!this.foodProduct.vitamin.B.percent) {
                    this.foodProduct.vitamin.B.percent = '0';
                }
                break;

            case foodFormControls.vitaminCGrams:
                this.foodProduct.vitamin.C.grams = opts.value;
                if (!this.foodProduct.vitamin.C.grams) {
                    this.foodProduct.vitamin.C.grams = '0';
                }
                break;

            case foodFormControls.vitaminCPercent:
                this.foodProduct.vitamin.C.percent = opts.value;
                if (!this.foodProduct.vitamin.C.percent) {
                    this.foodProduct.vitamin.C.percent = '0';
                }
                break;

            case foodFormControls.vitaminDGrams:
                this.foodProduct.vitamin.D.grams = opts.value;
                if (!this.foodProduct.vitamin.D.grams) {
                    this.foodProduct.vitamin.D.grams = '0';
                }
                break;

            case foodFormControls.vitaminDPercent:
                this.foodProduct.vitamin.D.percent = opts.value;
                if (!this.foodProduct.vitamin.D.percent) {
                    this.foodProduct.vitamin.D.percent = '0';
                }
                break;

            case foodFormControls.vitaminEGrams:
                this.foodProduct.vitamin.E.grams = opts.value;
                if (!this.foodProduct.vitamin.E.grams) {
                    this.foodProduct.vitamin.E.grams = '0';
                }
                break;

            case foodFormControls.vitaminEPercent:
                this.foodProduct.vitamin.E.percent = opts.value;
                if (!this.foodProduct.vitamin.E.percent) {
                    this.foodProduct.vitamin.E.percent = '0';
                }
                break;

            case foodFormControls.sugarTotalGrams:
                this.foodProduct.sugar.total.grams = opts.value;
                if (!this.foodProduct.sugar.total.grams) {
                    this.foodProduct.sugar.total.grams = '0';
                }
                break;

            case foodFormControls.sugarTotalPercent:
                this.foodProduct.sugar.total.percent = opts.value;
                if (!this.foodProduct.sugar.total.percent) {
                    this.foodProduct.sugar.total.percent = '0';
                }
                break;

            case foodFormControls.sugarAddedGrams:
                this.foodProduct.sugar.added.grams = opts.value;
                if (!this.foodProduct.sugar.added.grams) {
                    this.foodProduct.sugar.added.grams = '0';
                }
                break;

            case foodFormControls.sugarAddedPercent:
                this.foodProduct.sugar.added.percent = opts.value;
                if (!this.foodProduct.sugar.added.percent) {
                    this.foodProduct.sugar.added.percent = '0';
                }
                break;

            case foodFormControls.sugarAlcoholTotalGrams:
                this.foodProduct.sugarAlcohol.total.grams = opts.value;
                if (!this.foodProduct.sugarAlcohol.total.grams) {
                    this.foodProduct.sugarAlcohol.total.grams = '0';
                }
                break;

            case foodFormControls.sugarAlcoholTotalPercent:
                this.foodProduct.sugarAlcohol.total.percent = opts.value;
                if (!this.foodProduct.sugarAlcohol.total.percent) {
                    this.foodProduct.sugarAlcohol.total.percent = '0';
                }
                break;

            case foodFormControls.sugarAlcoholAddedGrams:
                this.foodProduct.sugarAlcohol.added.grams = opts.value;
                if (!this.foodProduct.sugarAlcohol.added.grams) {
                    this.foodProduct.sugarAlcohol.added.grams = '0';
                }
                break;

            case foodFormControls.sugarAlcoholAddedPercent:
                this.foodProduct.sugarAlcohol.added.percent = opts.value;
                if (!this.foodProduct.sugarAlcohol.added.percent) {
                    this.foodProduct.sugarAlcohol.added.percent = '0';
                }
                break;

        }

    }

    async getPicture() {
        // if (navigator.userAgent.toLowerCase().match('mobile')) {
        //     const image = await Camera.getPhoto({
        //         quality: 100,
        //         allowEditing: false,
        //         resultType: CameraResultType.Uri,
        //         source: CameraSource.Prompt
        //     });
        //     this.imgUrl = image.webPath;

        // } else {
        const image = await Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.Uri,
            source: CameraSource.Prompt
        });
        this.imgUrl = image.webPath;
        // }
    }

    createEditFoodProd() {
        if (!this.calories) {
            this.calories = '0';
        };
        if (!this.foodProduct.servingSize.measurement) {
            this.foodProduct.servingSize.measurement = 'gram';
        }
        const foodItem: IFoodProduct = {
            ...this.foodProduct,
            dateCreated: new Date(),
            name: this.name.toLowerCase(),
            calories: this.calories,
            picture: `images/${this.foodProduct.name}.png`
        };
        const response = insertOrUpdateFoodProduct(foodItem);
        if (response.success) {
            if (this.imgUrl) {
                const dataURL = `data:image/png; charset=utf8, ${encodeURIComponent(this.imgUrl)}`;
                writeImageFile({ name: this.foodProduct.name, data: dataURL });
            }
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
        const response = deleteFoodProduct(this.foodProduct);
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
        let message;
        if (control === 'create') {
            message = 'Do you want to save this product?'
        } else if (control === 'edit') {
            message = `Do you want to edit ${toUpperCase(this.name)}`;
        } else {
            message = `Do you want to delete ${toUpperCase(this.name)}`;
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

    async getBarcode() {
        if (this.toggleBarcode) {
            try {
                this.toggleBarcode = false;
                const resultObject = await scan(document.querySelector('#form-food-barcode'));
                document.querySelector('ion-input').value = resultObject.codeResult.code;
                this.foodProduct.barcode = resultObject.codeResult.code;
            } catch (error) {
                console.error(error);
            }
            document.querySelector('#form-food-barcode').innerHTML = stopScan();
        } else {
            document.querySelector('#form-food-barcode').innerHTML = stopScan();
            this.toggleBarcode = true;
        }
    }

    render() {
        return [
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
                        <div id="button" >
                            <img src={this.imgUrl} />
                            <ion-fab>
                                <ion-fab-button onClick={this.getPicture.bind(this)}>
                                    <ion-icon name="camera"></ion-icon>
                                </ion-fab-button>
                            </ion-fab>
                            {/* <ion-button fill="outline" size="large" onClick={this.getPicture.bind(this)}>
                                <ion-icon slot="icon-only" name="camera"></ion-icon>
                            </ion-button> */}
                        </div>
                        <ion-item>
                            <ion-input type="text" value={this.foodProduct.barcode} readonly></ion-input>
                            <ion-button size="large" fill="clear" onClick={this.getBarcode.bind(this)}>
                                <ion-icon slot="icon-only" name="barcode"></ion-icon>
                            </ion-button>
                        </ion-item>
                        <div id="form-food-barcode"></div>
                        <ion-item>
                            <ion-label position="floating">Name</ion-label>
                            <ion-input value={this.foodProduct.name} onInput={e => this.name = e.target['value']} type="text" required></ion-input>
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
                                <ion-input value={this.foodProduct.servingSize.size.toString()} onInput={e => this.getFormData({ prop: foodFormControls.servingSizeAmount, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodProduct.servingSize.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.servingSizeGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label>Measurement</ion-label>

                                <ion-select value={this.foodProduct.servingSize.measurement} multiple={false} placeholder="Select Measurement if amount is specified">
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
                                    value={this.foodProduct.servingPerContainer.toString()}
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
                                    value={this.foodProduct.fat.total.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.totalFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.fat.total.percent.toString()}
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
                                    value={this.foodProduct.fat.saturated.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.saturatedFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.fat.saturated.percent.toString()}
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
                                    value={this.foodProduct.fat.trans.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.transFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.fat.trans.percent.toString()}
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
                                    value={this.foodProduct.fat.monounsaturated.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.monounsaturatedFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.fat.monounsaturated.percent.toString()}
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
                                    value={this.foodProduct.fat.polyunsaturated.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.polyunsaturatedFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.fat.polyunsaturated.percent.toString()}
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
                                    value={this.foodProduct.cholesterol.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.cholesterolGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.cholesterol.percent.toString()}
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
                                    value={this.foodProduct.sodium.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.sodiumGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.sodium.percent.toString()}
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
                                    value={this.foodProduct.potassium.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.potassiumGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.potassium.percent.toString()}
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
                                    value={this.foodProduct.totalCarbohydrates.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.totalCarbohydratesGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.totalCarbohydrates.percent.toString()}
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
                                    value={this.foodProduct.dietaryFiber.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.dietaryFiberGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.dietaryFiber.percent.toString()}
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
                                    value={this.foodProduct.protein.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.proteinGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.protein.percent.toString()}
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
                                        value={this.foodProduct.sugar.total.grams.toString()}
                                        onInput={e => this.getFormData({ prop: foodFormControls.sugarTotalGrams, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label position="floating">Percent</ion-label>
                                    <ion-input
                                        value={this.foodProduct.sugar.total.percent.toString()}
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
                                        value={this.foodProduct.sugar.added.grams.toString()}
                                        onInput={e => this.getFormData({ prop: foodFormControls.sugarAddedGrams, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label position="floating">Percent</ion-label>
                                    <ion-input
                                        value={this.foodProduct.sugar.added.percent.toString()}
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
                                        value={this.foodProduct.sugarAlcohol.total.grams.toString()}
                                        onInput={e => this.getFormData({ prop: foodFormControls.sugarAlcoholTotalGrams, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label position="floating">Percent</ion-label>
                                    <ion-input
                                        value={this.foodProduct.sugarAlcohol.total.percent.toString()}
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
                                        value={this.foodProduct.sugarAlcohol.added.grams.toString()}
                                        onInput={e => this.getFormData({ prop: foodFormControls.sugarAlcoholAddedGrams, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label position="floating">Percent</ion-label>
                                    <ion-input
                                        value={this.foodProduct.sugarAlcohol.added.percent.toString()}
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
                                    value={this.foodProduct.niacin.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.niacinGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.niacin.percent.toString()}
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
                                    value={this.foodProduct.phosphorus.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.phosphorusGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.phosphorus.percent.toString()}
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
                                    value={this.foodProduct.calcium.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.calciumGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.calcium.percent.toString()}
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
                                    value={this.foodProduct.iron.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.ironGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.iron.percent.toString()}
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
                                    value={this.foodProduct.magnesium.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.magnesiumGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.magnesium.percent.toString()}
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
                                    value={this.foodProduct.manganese.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.manganeseGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.manganese.percent.toString()}
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
                                    value={this.foodProduct.vitamin.A.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.vitaminAGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.vitamin.A.percent.toString()}
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
                                    value={this.foodProduct.vitamin.B.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.vitaminBGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.vitamin.B.percent.toString()}
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
                                    value={this.foodProduct.vitamin.C.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.vitaminCGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.vitamin.C.percent.toString()}
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
                                    value={this.foodProduct.vitamin.D.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.vitaminDGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.vitamin.D.percent.toString()}
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
                                    value={this.foodProduct.vitamin.E.grams.toString()}
                                    onInput={e => this.getFormData({ prop: foodFormControls.vitaminEGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodProduct.vitamin.E.percent.toString()}
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
                        </ion-footer>
                        : ''
                }
            </div>
        ];
    }
}
