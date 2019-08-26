import { Component, h, State } from "@stencil/core";
import { IFoodItem } from "../../interfaces";
import { DIMENSIONS, foodNameToUppercase } from '../../helpers/utils';
import { formControls } from '../../helpers/utils'
import { insertOrUpdateFoodItem, deleteFoodItem, getFoodItem } from "../../services/db";

@Component({
    tag: 'app-form-food',
    styleUrl: 'app-form-food.css'
})
export class AppDaily {

    @State() calories = 0;
    @State() name = '';
    dimensions = DIMENSIONS;
    header = '';
    foodItem: IFoodItem;
    path: string;

    componentWillLoad() {
        this.calories = 0;
        this.foodItem = {
            name: '',
            barcode: '',
            picture: '',
            servingPerContainer: 0,
            servingSize: {
                size: 0,
                grams: 0,
                measurement: '',
            },
            calories: 0,
            fat: {
                total: {
                    grams: 0,
                    percent: 0,
                },
                saturated: {
                    grams: 0,
                    percent: 0,
                },
                trans: {
                    grams: 0,
                    percent: 0,
                },
                polyunsaturated: {
                    grams: 0,
                    percent: 0,
                },
                monounsaturated: {
                    grams: 0,
                    percent: 0,
                },
            },
            cholesterol: {
                grams: 0,
                percent: 0,
            },
            sodium: {
                grams: 0,
                percent: 0,
            },
            potassium: {
                grams: 0,
                percent: 0,
            },
            totalCarbohydrates: {
                grams: 0,
                percent: 0,
            },
            dietaryFiber: {
                grams: 0,
                percent: 0,
            },
            protein: {
                grams: 0,
                percent: 0,
            },
            niacin: {
                grams: 0,
                percent: 0,
            },
            phosphorus: {
                grams: 0,
                percent: 0,
            },
            calcium: {
                grams: 0,
                percent: 0,
            },
            iron: {
                grams: 0,
                percent: 0,
            },
            magnesium: {
                grams: 0,
                percent: 0,
            },
            manganese: {
                grams: 0,
                percent: 0,
            },
            dateCreated: null,
            vitamin: {
                A: {
                    grams: 0,
                    percent: 0,
                },
                B: {
                    grams: 0,
                    percent: 0,
                },
                C: {
                    grams: 0,
                    percent: 0,
                },
                D: {
                    grams: 0,
                    percent: 0,
                },
                E: {
                    grams: 0,
                    percent: 0,
                },
            },
            sugar: {
                added: {
                    grams: 0,
                    percent: 0,
                },
                total: {
                    grams: 0,
                    percent: 0,
                }
            },
            sugarAlcohol: {
                added: {
                    grams: 0,
                    percent: 0,
                },
                total: {
                    grams: 0,
                    percent: 0,
                }
            }

        };
        const modalElement = document.querySelector('ion-modal');
        this.path = modalElement.componentProps.mode;
        if (this.path === 'create') {
            this.header = 'Add a new food product!'
        } else {
            // Implement get Food Item from DB
            this.getProductData(modalElement.componentProps.$loki);
        }
        window.location.hash = '';
        window.onhashchange = () => this.goBack();
    }

    async goBack() {
        const modal = document.querySelector('ion-modal-controller');
        await modal.dismiss();
    }

    getProductData($loki: number) {
        const response = getFoodItem($loki);
        if (response.success) {
            this.foodItem = {
                ...this.foodItem,
                ...response.data
            }
            this.name = this.foodItem.name;
            this.calories = this.foodItem.calories;
            this.header = `Edit ${foodNameToUppercase(this.foodItem.name)}!`;
        } else {
            console.error(response.error);
        }
    }


    getFormData(opts: { prop: string, value: number }) {

        switch (opts.prop) {
            case formControls.servingSizeAmount:
                this.foodItem.servingSize.size = opts.value
                if (!this.foodItem.servingSize.size) {
                    this.foodItem.servingSize.size = 0;
                }
                break;
            case formControls.servingSizeGrams:
                this.foodItem.servingSize.grams = opts.value
                if (!this.foodItem.servingSize.grams) {
                    this.foodItem.servingSize.grams = 0;
                }
                break;
            case formControls.servingPerContainer:
                this.foodItem.servingPerContainer = opts.value
                if (!this.foodItem.servingPerContainer) {
                    this.foodItem.servingPerContainer = 0;
                }
                break;

            case formControls.totalFatGrams:
                this.foodItem.fat.total.grams = opts.value
                if (!this.foodItem.fat.total.grams) {
                    this.foodItem.fat.total.grams = 0;
                }
                break;

            case formControls.totalFatPercent:
                this.foodItem.fat.total.percent = opts.value
                if (!this.foodItem.fat.total.percent) {
                    this.foodItem.fat.total.percent = 0;
                }
                break;

            case formControls.saturatedFatGrams:
                this.foodItem.fat.saturated.grams = opts.value
                if (!this.foodItem.fat.saturated.grams) {
                    this.foodItem.fat.saturated.grams = 0;
                }
                break;

            case formControls.saturatedFatPercent:
                this.foodItem.fat.saturated.percent = opts.value
                if (!this.foodItem.fat.saturated.percent) {
                    this.foodItem.fat.saturated.percent = 0;
                }
                break;

            case formControls.transFatGrams:
                this.foodItem.fat.trans.grams = opts.value
                if (!this.foodItem.fat.trans.grams) {
                    this.foodItem.fat.trans.grams = 0;
                }
                break;

            case formControls.transFatPercent:
                this.foodItem.fat.trans.percent = opts.value
                if (!this.foodItem.fat.trans.percent) {
                    this.foodItem.fat.trans.percent = 0;
                }
                break;

            case formControls.polyunsaturatedFatGrams:
                this.foodItem.fat.polyunsaturated.grams = opts.value
                if (!this.foodItem.fat.polyunsaturated.grams) {
                    this.foodItem.fat.polyunsaturated.grams = 0;
                }
                break;

            case formControls.polyunsaturatedFatPercent:
                this.foodItem.fat.polyunsaturated.percent = opts.value
                if (!this.foodItem.fat.polyunsaturated.percent) {
                    this.foodItem.fat.polyunsaturated.percent = 0;
                }
                break;

            case formControls.monounsaturatedFatGrams:
                this.foodItem.fat.monounsaturated.grams = opts.value
                if (!this.foodItem.fat.monounsaturated.grams) {
                    this.foodItem.fat.monounsaturated.grams = 0;
                }
                break;

            case formControls.monounsaturatedFatPercent:
                this.foodItem.fat.monounsaturated.percent = opts.value
                if (!this.foodItem.fat.monounsaturated.percent) {
                    this.foodItem.fat.monounsaturated.percent = 0;
                }
                break;

            case formControls.cholesterolGrams:
                this.foodItem.cholesterol.grams = opts.value
                if (!this.foodItem.cholesterol.grams) {
                    this.foodItem.cholesterol.grams = 0;
                }
                break;

            case formControls.cholesterolPercent:
                this.foodItem.cholesterol.percent = opts.value
                if (!this.foodItem.cholesterol.percent) {
                    this.foodItem.cholesterol.percent = 0;
                }
                break;

            case formControls.sodiumGrams:
                this.foodItem.sodium.grams = opts.value
                if (!this.foodItem.sodium.grams) {
                    this.foodItem.sodium.grams = 0;
                }
                break;

            case formControls.sodiumPercent:
                this.foodItem.sodium.percent = opts.value
                if (!this.foodItem.sodium.percent) {
                    this.foodItem.sodium.percent = 0;
                }
                break;

            case formControls.potassiumGrams:
                this.foodItem.potassium.grams = opts.value
                if (!this.foodItem.potassium.grams) {
                    this.foodItem.potassium.grams = 0;
                }
                break;

            case formControls.potassiumPercent:
                this.foodItem.potassium.percent = opts.value
                if (!this.foodItem.potassium.percent) {
                    this.foodItem.potassium.percent = 0;
                }
                break;

            case formControls.totalCarbohydratesGrams:
                this.foodItem.totalCarbohydrates.grams = opts.value
                if (!this.foodItem.totalCarbohydrates.grams) {
                    this.foodItem.totalCarbohydrates.grams = 0;
                }
                break;

            case formControls.totalCarbohydratesPercent:
                this.foodItem.totalCarbohydrates.percent = opts.value
                if (!this.foodItem.totalCarbohydrates.percent) {
                    this.foodItem.totalCarbohydrates.percent = 0;
                }
                break;

            case formControls.dietaryFiberGrams:
                this.foodItem.dietaryFiber.grams = opts.value
                if (!this.foodItem.dietaryFiber.grams) {
                    this.foodItem.dietaryFiber.grams = 0;
                }
                break;

            case formControls.dietaryFiberPercent:
                this.foodItem.dietaryFiber.percent = opts.value
                if (!this.foodItem.dietaryFiber.percent) {
                    this.foodItem.dietaryFiber.percent = 0;
                }
                break;

            case formControls.proteinGrams:
                this.foodItem.protein.grams = opts.value
                if (!this.foodItem.protein.grams) {
                    this.foodItem.protein.grams = 0;
                }
                break;

            case formControls.proteinPercent:
                this.foodItem.protein.percent = opts.value
                if (!this.foodItem.protein.grams) {
                    this.foodItem.protein.grams = 0;
                }
                break;

            case formControls.niacinGrams:
                this.foodItem.niacin.grams = opts.value
                if (!this.foodItem.niacin.grams) {
                    this.foodItem.niacin.grams = 0;
                }
                break;

            case formControls.niacinPercent:
                this.foodItem.niacin.percent = opts.value
                if (!this.foodItem.niacin.percent) {
                    this.foodItem.niacin.percent = 0;
                }
                break;

            case formControls.phosphorusGrams:
                this.foodItem.phosphorus.grams = opts.value
                if (!this.foodItem.phosphorus.grams) {
                    this.foodItem.phosphorus.grams = 0;
                }
                break;

            case formControls.phosphorusPercent:
                this.foodItem.phosphorus.percent = opts.value
                if (!this.foodItem.phosphorus.percent) {
                    this.foodItem.phosphorus.percent = 0;
                }
                break;

            case formControls.calciumGrams:
                this.foodItem.calcium.grams = opts.value
                if (!this.foodItem.calcium.grams) {
                    this.foodItem.calcium.grams = 0;
                }
                break;

            case formControls.calciumPercent:
                this.foodItem.calcium.percent = opts.value
                if (!this.foodItem.calcium.percent) {
                    this.foodItem.calcium.percent = 0;
                }
                break;

            case formControls.ironGrams:
                this.foodItem.iron.grams = opts.value
                if (!this.foodItem.iron.grams) {
                    this.foodItem.iron.grams = 0;
                }
                break;

            case formControls.ironPercent:
                this.foodItem.iron.percent = opts.value
                if (!this.foodItem.iron.percent) {
                    this.foodItem.iron.percent = 0;
                }
                break;

            case formControls.magnesiumGrams:
                this.foodItem.magnesium.grams = opts.value
                if (!this.foodItem.magnesium.grams) {
                    this.foodItem.magnesium.grams = 0;
                }
                break;

            case formControls.magnesiumPercent:
                this.foodItem.magnesium.percent = opts.value
                if (!this.foodItem.magnesium.percent) {
                    this.foodItem.magnesium.percent = 0;
                }
                break;

            case formControls.manganeseGrams:
                this.foodItem.manganese.grams = opts.value
                if (!this.foodItem.manganese.grams) {
                    this.foodItem.manganese.grams = 0;
                }
                break;

            case formControls.manganesePercent:
                this.foodItem.manganese.percent = opts.value
                if (!this.foodItem.manganese.percent) {
                    this.foodItem.manganese.percent = 0;
                }
                break;

            case formControls.vitaminAGrams:
                this.foodItem.vitamin.A.grams = opts.value
                if (!this.foodItem.vitamin.A.grams) {
                    this.foodItem.vitamin.A.grams = 0;
                }
                break;

            case formControls.vitaminAPercent:
                this.foodItem.vitamin.A.percent = opts.value
                if (!this.foodItem.vitamin.A.grams) {
                    this.foodItem.vitamin.A.grams = 0;
                }
                break;

            case formControls.vitaminBGrams:
                this.foodItem.vitamin.B.grams = opts.value
                if (!this.foodItem.vitamin.B.grams) {
                    this.foodItem.vitamin.B.grams = 0;
                }
                break;

            case formControls.vitaminBPercent:
                this.foodItem.vitamin.B.percent = opts.value
                if (!this.foodItem.vitamin.B.percent) {
                    this.foodItem.vitamin.B.percent = 0;
                }
                break;

            case formControls.vitaminCGrams:
                this.foodItem.vitamin.C.grams = opts.value
                if (!this.foodItem.vitamin.C.grams) {
                    this.foodItem.vitamin.C.grams = 0;
                }
                break;

            case formControls.vitaminCPercent:
                this.foodItem.vitamin.C.percent = opts.value
                if (!this.foodItem.vitamin.C.percent) {
                    this.foodItem.vitamin.C.percent = 0;
                }
                break;

            case formControls.vitaminDGrams:
                this.foodItem.vitamin.D.grams = opts.value
                if (!this.foodItem.vitamin.D.grams) {
                    this.foodItem.vitamin.D.grams = 0;
                }
                break;

            case formControls.vitaminDPercent:
                this.foodItem.vitamin.D.percent = opts.value
                if (!this.foodItem.vitamin.D.percent) {
                    this.foodItem.vitamin.D.percent = 0;
                }
                break;

            case formControls.vitaminEGrams:
                this.foodItem.vitamin.E.grams = opts.value
                if (!this.foodItem.vitamin.E.grams) {
                    this.foodItem.vitamin.E.grams = 0;
                }
                break;

            case formControls.vitaminEPercent:
                this.foodItem.vitamin.E.percent = opts.value
                if (!this.foodItem.vitamin.E.percent) {
                    this.foodItem.vitamin.E.percent = 0;
                }
                break;

            case formControls.sugarTotalGrams:
                this.foodItem.sugar.total.grams = opts.value
                if (!this.foodItem.sugar.total.grams) {
                    this.foodItem.sugar.total.grams = 0;
                }
                break;

            case formControls.sugarTotalPercent:
                this.foodItem.sugar.total.percent = opts.value
                if (!this.foodItem.sugar.total.percent) {
                    this.foodItem.sugar.total.percent = 0;
                }
                break;

            case formControls.sugarAddedGrams:
                this.foodItem.sugar.added.grams = opts.value
                if (!this.foodItem.sugar.added.grams) {
                    this.foodItem.sugar.added.grams = 0;
                }
                break;

            case formControls.sugarAddedPercent:
                this.foodItem.sugar.added.percent = opts.value
                if (!this.foodItem.sugar.added.percent) {
                    this.foodItem.sugar.added.percent = 0;
                }
                break;

            case formControls.sugarAlcoholTotalGrams:
                this.foodItem.sugarAlcohol.total.grams = opts.value
                if (!this.foodItem.sugarAlcohol.total.grams) {
                    this.foodItem.sugarAlcohol.total.grams = 0;
                }
                break;

            case formControls.sugarAlcoholTotalPercent:
                this.foodItem.sugarAlcohol.total.percent = opts.value
                if (!this.foodItem.sugarAlcohol.total.percent) {
                    this.foodItem.sugarAlcohol.total.percent = 0;
                }
                break;

            case formControls.sugarAlcoholAddedGrams:
                this.foodItem.sugarAlcohol.added.grams = opts.value
                if (!this.foodItem.sugarAlcohol.added.grams) {
                    this.foodItem.sugarAlcohol.added.grams = 0;
                }
                break;

            case formControls.sugarAlcoholAddedPercent:
                this.foodItem.sugarAlcohol.added.percent = opts.value
                if (!this.foodItem.sugarAlcohol.added.percent) {
                    this.foodItem.sugarAlcohol.added.percent = 0;
                }
                break;

        }

    }

    componentDidLoad() {
        const ionSelect = document.querySelector('ion-select');
        ionSelect.addEventListener('ionChange', (ev) => {
            this.foodItem.servingSize.measurement = ev['detail'].value;

        });
    }

    getPicture() {
        console.log('click Picture')
    }

    getBarcode() {
        console.log('click Barcode')
    }

    createEditFoodProd() {
        if (!this.calories) {
            this.calories = 0;
        }
        const foodItem: IFoodItem = {
            ...this.foodItem,
            dateCreated: new Date(),
            name: this.name.toLowerCase(),
            calories: this.calories
        };
        const response = insertOrUpdateFoodItem(foodItem);
        if (response.success) {
            this.displayMessage({
                header: 'Success!',
                message: response.message
            });
        } else {
            this.displayMessage({
                header: 'Error!',
                message: response.error
            });
        }
    }

    deleteFoodProd() {
        const response = deleteFoodItem(this.foodItem);
        if (response.success) {
            this.displayMessage({
                header: 'Success!',
                message: response.message
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
        buttons?: string[]
    }) {
        const alertController = document.querySelector('ion-alert-controller');
        if (!opts.buttons) {
            opts.buttons = ['OK'];
        }
        const alert = await alertController.create({
            header: opts.header,
            subHeader: opts.subHeader,
            message: opts.message,
            buttons: opts.buttons
        });
        await alert.present();
        return this.goBack();
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
                                    this.name && (this.calories || this.calories === 0)
                                        ? <ion-buttons slot="end">
                                            {this.path === 'create'
                                                ? <ion-button onClick={() => this.createEditFoodProd()}>Create</ion-button>
                                                : <div>
                                                    <ion-button onClick={() => this.deleteFoodProd()}>Delete</ion-button>
                                                    <ion-button onClick={() => this.createEditFoodProd()}>Edit</ion-button>
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
                        <div>
                            <h1>{this.header}</h1>
                            <ion-button size="large" fill="clear" onClick={this.getPicture.bind(this)}>
                                <ion-icon slot="icon-only" name="camera"></ion-icon>
                            </ion-button>
                            <p>Take a photo or choose one picture from the album.</p>
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
                                <ion-input value={this.foodItem.servingSize.size.toString()} onInput={e => this.getFormData({ prop: formControls.servingSizeAmount, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.servingSize.grams.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.servingSizeGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label>Measurement</ion-label>

                                <ion-select value={this.foodItem.servingSize.measurement} multiple={false} placeholder="Select Measurement if amount is specified">
                                    {
                                        this.dimensions.map(dimension =>
                                            <ion-select-option value={dimension}>{dimension}</ion-select-option>
                                        )
                                    }
                                </ion-select>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Per container</ion-label>
                                <ion-input
                                    value={this.foodItem.servingPerContainer.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.servingPerContainer, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.totalFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.fat.total.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.totalFatPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.saturatedFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.fat.saturated.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.saturatedFatPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.transFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.fat.trans.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.transFatPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.monounsaturatedFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.fat.monounsaturated.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.monounsaturatedFatPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.polyunsaturatedFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.fat.polyunsaturated.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.polyunsaturatedFatPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.cholesterolGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.cholesterol.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.cholesterolPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.sodiumGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.sodium.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.sodiumPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.potassiumGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.potassium.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.potassiumPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.totalCarbohydratesGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.totalCarbohydrates.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.totalCarbohydratesPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.dietaryFiberGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.dietaryFiber.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.dietaryFiberPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.proteinGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.protein.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.proteinPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Niacin</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    value={this.foodItem.niacin.grams.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.niacinGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.niacin.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.niacinPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.phosphorusGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.phosphorus.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.phosphorusPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.calciumGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.calcium.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.calciumPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.ironGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.iron.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.ironPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.magnesiumGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.magnesium.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.magnesiumPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.manganeseGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.manganese.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.manganesePercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.vitaminAGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.vitamin.A.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.vitaminAGrams, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.vitaminBGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.vitamin.B.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.vitaminBPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.vitaminCGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.vitamin.C.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.vitaminCPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.vitaminDGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.vitamin.D.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.vitaminDPercent, value: e.target['value'] })}
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
                                    onInput={e => this.getFormData({ prop: formControls.vitaminEGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    value={this.foodItem.vitamin.E.percent.toString()}
                                    onInput={e => this.getFormData({ prop: formControls.vitaminEPercent, value: e.target['value'] })}
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
                                        onInput={e => this.getFormData({ prop: formControls.sugarTotalGrams, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label position="floating">Percent</ion-label>
                                    <ion-input
                                        value={this.foodItem.sugar.total.percent.toString()}
                                        onInput={e => this.getFormData({ prop: formControls.sugarTotalPercent, value: e.target['value'] })}
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
                                        onInput={e => this.getFormData({ prop: formControls.sugarAddedGrams, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label position="floating">Percent</ion-label>
                                    <ion-input
                                        value={this.foodItem.sugar.added.percent.toString()}
                                        onInput={e => this.getFormData({ prop: formControls.sugarAddedPercent, value: e.target['value'] })}
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
                                        onInput={e => this.getFormData({ prop: formControls.sugarAlcoholTotalGrams, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label position="floating">Percent</ion-label>
                                    <ion-input
                                        value={this.foodItem.sugarAlcohol.total.percent.toString()}
                                        onInput={e => this.getFormData({ prop: formControls.sugarAlcoholTotalPercent, value: e.target['value'] })}
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
                                        onInput={e => this.getFormData({ prop: formControls.sugarAlcoholAddedGrams, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label position="floating">Percent</ion-label>
                                    <ion-input
                                        value={this.foodItem.sugarAlcohol.added.percent.toString()}
                                        onInput={e => this.getFormData({ prop: formControls.sugarAlcoholAddedPercent, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                            </ion-item-group>
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
                                    this.name && this.calories || this.calories === 0 || this.foodItem.calories
                                        ? <ion-buttons slot="end">
                                            {this.path === 'create'
                                                ? <ion-button onClick={() => this.createEditFoodProd()}>Create</ion-button>
                                                : <div>
                                                    <ion-button onClick={() => this.deleteFoodProd()}>Delete</ion-button>
                                                    <ion-button onClick={() => this.createEditFoodProd()}>Edit</ion-button>
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
