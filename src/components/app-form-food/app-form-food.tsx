import { Component, h, State, Listen } from "@stencil/core";
import { IFoodItem } from "../../interfaces";
import { DIMENSIONS } from '../../helpers/utils';
import { formControls } from '../../helpers/utils'

@Component({
    tag: 'app-form-food',
    styleUrl: 'app-form-food.css'
})
export class AppDaily {

    @State() calories;
    @State() name;
    dimensions = DIMENSIONS;
    header = '';
    foodItem: IFoodItem = {
        name: '',
        barcode: '',
        picture: '',
        servingPerContainer: 0,
        servingSize: {
            amount: 0,
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
        dateCreated: '',
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
    path: string;

    componentWillLoad() {
        this.path = document.location.pathname.split('/')[2];
        if (this.path === 'create') {
            this.header = 'Add a new food product!'
        } else {
            // Implement get Food Item from DB
            this.getProductData();
        }
    }

    getProductData() {
        //TODO: Parameters > id
        // this.header = `Edit ${this.foodItem.name}!`;
        this.header = `Edit template!`;
    }


    getFormData(opts: { prop: string, value: number }) {
        switch (opts.prop) {
            case formControls.servingSizeAmount:
                this.foodItem.servingSize.amount = parseInt(formControls.servingSizeAmount);
                break;

            case formControls.servingPerContainer:
                this.foodItem.servingPerContainer = parseInt(formControls.servingPerContainer);
                break;

            case formControls.totalFatGrams:
                this.foodItem.fat.total.grams = parseInt(formControls.totalFatGrams);
                break;

            case formControls.totalFatPercent:
                this.foodItem.fat.total.percent = parseInt(formControls.totalFatPercent);
                break;

            case formControls.saturatedFatGrams:
                this.foodItem.fat.saturated.grams = parseInt(formControls.saturatedFatGrams);
                break;

            case formControls.saturatedFatPercent:
                this.foodItem.fat.saturated.percent = parseInt(formControls.saturatedFatPercent);
                break;

            case formControls.transFatGrams:
                this.foodItem.fat.trans.grams = parseInt(formControls.transFatGrams);
                break;

            case formControls.transFatPercent:
                this.foodItem.fat.trans.percent = parseInt(formControls.transFatPercent);
                break;

            case formControls.polyunsaturatedFatGrams:
                this.foodItem.fat.polyunsaturated.grams = parseInt(formControls.polyunsaturatedFatGrams);
                break;

            case formControls.polyunsaturatedFatPercent:
                this.foodItem.fat.polyunsaturated.percent = parseInt(formControls.polyunsaturatedFatPercent);
                break;

            case formControls.monounsaturatedFatGrams:
                this.foodItem.fat.monounsaturated.grams = parseInt(formControls.monounsaturatedFatGrams);
                break;

            case formControls.monounsaturatedFatPercent:
                this.foodItem.fat.monounsaturated.percent = parseInt(formControls.monounsaturatedFatPercent);
                break;

            case formControls.cholesterolGrams:
                this.foodItem.cholesterol.grams = parseInt(formControls.cholesterolGrams);
                break;

            case formControls.cholesterolPercent:
                this.foodItem.cholesterol.percent = parseInt(formControls.cholesterolPercent);
                break;

            case formControls.sodiumGrams:
                this.foodItem.sodium.grams = parseInt(formControls.sodiumGrams);
                break;

            case formControls.sodiumPercent:
                this.foodItem.sodium.percent = parseInt(formControls.sodiumPercent);
                break;

            case formControls.potassiumGrams:
                this.foodItem.potassium.grams = parseInt(formControls.potassiumGrams);
                break;

            case formControls.potassiumPercent:
                this.foodItem.potassium.percent = parseInt(formControls.potassiumPercent);
                break;

            case formControls.totalCarbohydratesGrams:
                this.foodItem.totalCarbohydrates.grams = parseInt(formControls.totalCarbohydratesGrams);
                break;

            case formControls.totalCarbohydratesPercent:
                this.foodItem.totalCarbohydrates.percent = parseInt(formControls.totalCarbohydratesPercent);
                break;

            case formControls.dietaryFiberGrams:
                this.foodItem.dietaryFiber.grams = parseInt(formControls.dietaryFiberGrams);
                break;

            case formControls.dietaryFiberPercent:
                this.foodItem.dietaryFiber.percent = parseInt(formControls.dietaryFiberPercent);
                break;

            case formControls.proteinGrams:
                this.foodItem.protein.grams = parseInt(formControls.proteinGrams);
                break;

            case formControls.proteinPercent:
                this.foodItem.protein.grams = parseInt(formControls.proteinPercent);
                break;

            case formControls.niacinGrams:
                this.foodItem.niacin.grams = parseInt(formControls.niacinGrams);
                break;

            case formControls.niacinPercent:
                this.foodItem.niacin.percent = parseInt(formControls.niacinPercent);
                break;

            case formControls.phosphorusGrams:
                this.foodItem.phosphorus.grams = parseInt(formControls.phosphorusGrams);
                break;

            case formControls.phosphorusPercent:
                this.foodItem.phosphorus.percent = parseInt(formControls.phosphorusPercent);
                break;

            case formControls.calciumGrams:
                this.foodItem.calcium.grams = parseInt(formControls.calciumGrams);
                break;

            case formControls.calciumPercent:
                this.foodItem.calcium.percent = parseInt(formControls.calciumPercent);
                break;

            case formControls.ironGrams:
                this.foodItem.iron.grams = parseInt(formControls.ironGrams);
                break;

            case formControls.ironPercent:
                this.foodItem.iron.percent = parseInt(formControls.ironPercent);
                break;

            case formControls.magnesiumGrams:
                this.foodItem.magnesium.grams = parseInt(formControls.magnesiumGrams);
                break;

            case formControls.magnesiumPercent:
                this.foodItem.magnesium.percent = parseInt(formControls.magnesiumPercent);
                break;

            case formControls.manganeseGrams:
                this.foodItem.manganese.grams = parseInt(formControls.manganeseGrams);
                break;

            case formControls.manganesePercent:
                this.foodItem.manganese.percent = parseInt(formControls.manganesePercent);
                break;

            case formControls.vitaminAGrams:
                this.foodItem.vitamin.A.grams = parseInt(formControls.vitaminAGrams);
                break;

            case formControls.vitaminAPercent:
                this.foodItem.vitamin.A.grams = parseInt(formControls.vitaminAPercent);
                break;

            case formControls.vitaminBGrams:
                this.foodItem.vitamin.B.grams = parseInt(formControls.vitaminBGrams);
                break;

            case formControls.vitaminBPercent:
                this.foodItem.vitamin.B.percent = parseInt(formControls.vitaminBPercent);
                break;

            case formControls.vitaminCGrams:
                this.foodItem.vitamin.C.grams = parseInt(formControls.vitaminCGrams);
                break;

            case formControls.vitaminCPercent:
                this.foodItem.vitamin.C.percent = parseInt(formControls.vitaminCPercent);
                break;

            case formControls.vitaminDGrams:
                this.foodItem.vitamin.D.grams = parseInt(formControls.vitaminDGrams);
                break;

            case formControls.vitaminDPercent:
                this.foodItem.vitamin.D.percent = parseInt(formControls.vitaminDPercent);
                break;

            case formControls.vitaminEGrams:
                this.foodItem.vitamin.E.grams = parseInt(formControls.vitaminEGrams);
                break;

            case formControls.vitaminEPercent:
                this.foodItem.vitamin.E.percent = parseInt(formControls.vitaminEPercent);
                break;

            case formControls.sugarTotalGrams:
                this.foodItem.sugar.total.grams = parseInt(formControls.sugarTotalGrams);
                break;

            case formControls.sugarTotalPercent:
                this.foodItem.sugar.total.percent = parseInt(formControls.sugarTotalPercent);
                break;

            case formControls.sugarAddedGrams:
                this.foodItem.sugar.added.grams = parseInt(formControls.sugarAddedGrams);
                break;

            case formControls.sugarAddedPercent:
                this.foodItem.sugar.added.percent = parseInt(formControls.sugarAddedPercent);
                break;

            case formControls.sugarAlcoholTotalGrams:
                this.foodItem.sugarAlcohol.total.grams = parseInt(formControls.sugarAlcoholTotalGrams);
                break;

            case formControls.sugarAlcoholTotalPercent:
                this.foodItem.sugarAlcohol.total.percent = parseInt(formControls.sugarAlcoholTotalPercent);
                break;

            case formControls.sugarAlcoholAddedGrams:
                this.foodItem.sugarAlcohol.added.grams = parseInt(formControls.sugarAlcoholAddedGrams);
                break;

            case formControls.sugarAlcoholAddedPercent:
                this.foodItem.sugarAlcohol.added.percent = parseInt(formControls.sugarAlcoholAddedPercent);
                break;

        }

    }

    @Listen('ionChange')
    handleIonChange(ev) {
        this.foodItem.servingSize.measurement = ev.detail.value;
    }

    getPicture() {
        console.log('click Picture')
    }

    getBarcode() {
        console.log('click Barcode')
    }

    createFoodProd() {
        if (this.name) {
            this.foodItem.name = this.name;
        } else {
            //implement error message

            return;
        }
        if (this.calories || this.calories < 0) {
            this.foodItem.calories = this.calories;
        } else {
            //implement error message

            return;
        }
    }

    render() {
        return [
            <ion-nav></ion-nav>,
            <div>
                {
                    navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
                        ? ''
                        : <ion-header>
                            <ion-toolbar color="primary">
                                <ion-buttons slot="start">
                                    <ion-button href="/food/list" >
                                        <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
                                    </ion-button>
                                </ion-buttons>
                                {
                                    this.calories > 0 && this.name
                                        ? <ion-buttons slot="end">
                                            {this.path === 'create'
                                                ? <ion-button>Create</ion-button>
                                                : <div>
                                                    <ion-button>Delete</ion-button>
                                                    <ion-button>Edit</ion-button>
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

                        <ion-item>
                            <ion-input type="text" readonly></ion-input>
                            <ion-button size="large" fill="clear" onClick={this.getBarcode.bind(this)}>
                                <ion-icon slot="icon-only" name="barcode"></ion-icon>
                            </ion-button>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Name</ion-label>
                            <ion-input onInput={e => this.name = e.target['value']} type="text" required></ion-input>
                        </ion-item>

                        <h3>Nutrition Facts</h3>
                        <ion-item>
                            <ion-label position="floating">Calories</ion-label>
                            <ion-input onInput={e => this.calories = e.target['value']} type="number" required></ion-input>
                        </ion-item>


                        <ion-item-group>
                            <h5>Servings</h5>
                            <ion-item>
                                <ion-label position="floating">Per container</ion-label>
                                <ion-input
                                    onInput={e => this.getFormData({ prop: formControls.servingPerContainer, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Amount</ion-label>
                                <ion-input onInput={e => this.getFormData({ prop: formControls.servingSizeAmount, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label>Measurement</ion-label>

                                <ion-select multiple={false} placeholder="Select Measurement if amount is specified">
                                    {
                                        this.dimensions.map(dimension =>
                                            <ion-select-option value={dimension}>{dimension}</ion-select-option>
                                        )
                                    }
                                </ion-select>

                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h6>Total Fat</h6>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    onInput={e => this.getFormData({ prop: formControls.totalFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.saturatedFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.transFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.monounsaturatedFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.polyunsaturatedFatGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.cholesterolGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    onInput={e => this.getFormData({ prop: formControls.cholesterolPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Sodium</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    onInput={e => this.getFormData({ prop: formControls.sodiumGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.potassiumGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    onInput={e => this.getFormData({ prop: formControls.potassiumPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>


                        <ion-item-group>
                            <h5>Total Carbohydrates</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input
                                    onInput={e => this.getFormData({ prop: formControls.totalCarbohydratesGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.dietaryFiberGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.proteinGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.niacinGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.phosphorusGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.calciumGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.ironGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.magnesiumGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.manganeseGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.vitaminAGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.vitaminBGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.vitaminCGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.vitaminDGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
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
                                    onInput={e => this.getFormData({ prop: formControls.vitaminEGrams, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input
                                    onInput={e => this.getFormData({ prop: formControls.vitaminEPercent, value: e.target['value'] })}
                                    type="number">
                                </ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Sugar</h5>
                            <ion-item-group class="ion-margin-horizontal">
                                <h6>
                                    <ion-label>Total</ion-label>
                                </h6>
                                <ion-item>
                                    <ion-label position="floating">Grams</ion-label>
                                    <ion-input
                                        onInput={e => this.getFormData({ prop: formControls.sugarTotalGrams, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label position="floating">Percent</ion-label>
                                    <ion-input
                                        onInput={e => this.getFormData({ prop: formControls.sugarTotalPercent, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                            </ion-item-group>
                            <ion-item-group class="ion-margin-horizontal">
                                <h6>
                                    <ion-label>Added</ion-label>
                                </h6>
                                <ion-item>
                                    <ion-label position="floating">Grams</ion-label>
                                    <ion-input
                                        onInput={e => this.getFormData({ prop: formControls.sugarAddedGrams, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label position="floating">Percent</ion-label>
                                    <ion-input
                                        onInput={e => this.getFormData({ prop: formControls.sugarAddedPercent, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                            </ion-item-group>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Sugar Alcohol</h5>
                            <ion-item-group class="ion-margin-horizontal">
                                <h6>
                                    <ion-label>Total</ion-label>
                                </h6>
                                <ion-item>
                                    <ion-label position="floating">Grams</ion-label>
                                    <ion-input
                                        onInput={e => this.getFormData({ prop: formControls.sugarAlcoholTotalGrams, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label position="floating">Percent</ion-label>
                                    <ion-input
                                        onInput={e => this.getFormData({ prop: formControls.sugarAlcoholTotalPercent, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                            </ion-item-group>
                            <ion-item-group class="ion-margin-horizontal">
                                <h6>
                                    <ion-label>Added</ion-label>
                                </h6>
                                <ion-item>
                                    <ion-label position="floating">Grams</ion-label>
                                    <ion-input
                                        onInput={e => this.getFormData({ prop: formControls.sugarAlcoholAddedGrams, value: e.target['value'] })}
                                        type="number">
                                    </ion-input>
                                </ion-item>
                                <ion-item>
                                    <ion-label position="floating">Percent</ion-label>
                                    <ion-input
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
                                    <ion-button href="/food/list">
                                        <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
                                    </ion-button>
                                </ion-buttons>
                                {
                                    this.calories > 0 && this.name
                                        ? <ion-buttons slot="end">
                                            {this.path === 'create'
                                                ? <ion-button>Create</ion-button>
                                                : <div>
                                                    <ion-button>Delete</ion-button>
                                                    <ion-button>Edit</ion-button>
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
