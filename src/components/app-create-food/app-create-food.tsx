import { Component, h, State } from "@stencil/core";
import { IFoodItem } from "../../interfaces";
import { dimensions } from '../../helpers/utils';

@Component({
    tag: 'app-create-food',
    styleUrl: 'app-create-food.css'
})
export class AppDaily {

    @State() foodItem: IFoodItem = {
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

    @State() dimensions = dimensions;

    componentWillLoad() {
        // TODO: Add this to every input that is on top of a item divider
        // const pictureElement: any = document.getElementById('picture');
        // navigator.userAgent.toLowerCase().match('iphone') || navigator.userAgent.toLowerCase().match('ipad')
        //     ? pictureElement.lines = 'none'
        //     : '';
    }

    getPicture() { }

    getBarcode() { }

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
                                    this.foodItem.calories > 0 && this.foodItem.name
                                        ? <ion-buttons slot="end">
                                            <ion-button>Create</ion-button>
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
                            <h1>Add a new food product!</h1>
                            <ion-button size="large" fill="clear">
                                <ion-icon slot="icon-only" name="camera"></ion-icon>
                            </ion-button>
                            <p>Take a photo or choose one picture from the album.</p>
                        </div>

                        <ion-item>
                            <ion-input type="text" readonly></ion-input>
                            <ion-button size="large" fill="clear">
                                <ion-icon slot="icon-only" name="barcode"></ion-icon>
                            </ion-button>
                        </ion-item>

                        <ion-item>
                            <ion-label position="floating">Name</ion-label>
                            <ion-input type="text" required></ion-input>
                        </ion-item>

                        <h3>Nutrition Facts</h3>
                        <ion-item>
                            <ion-label position="floating">Calories</ion-label>
                            <ion-input type="text" required></ion-input>
                        </ion-item>


                        <ion-item-group>
                            <h5>Servings per container</h5>
                            <ion-item>
                                <ion-label position="floating">Servings size</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Amount</ion-label>
                                <ion-input type="text"></ion-input>
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
                            <h5>Fat</h5>
                            <ion-item>
                                <ion-label position="floating">Total Fat</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Saturated Fat</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Trans Fat</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Monounsaturated Fat</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Polyunsaturated Fat</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Cholesterol</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Sodium</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>


                        <ion-item-group>
                            <h5>Potassium</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>


                        <ion-item-group>
                            <h5>Total Carbohydrates</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>


                        <ion-item-group>
                            <h5>Dietary Fiber</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>


                        <ion-item-group>
                            <h5>Protein</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>


                        <ion-item-group>
                            <h5>Cholesterol</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>


                        <ion-item-group>
                            <h5>Niacin</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>


                        <ion-item-group>
                            <h5>Cholesterol</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>


                        <ion-item-group>
                            <h5>Phosphorus</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>


                        <ion-item-group>
                            <h5>Calcium</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>


                        <ion-item-group>
                            <h5>Iron</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Magnesium</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Manganese</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Vitamin A</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Vitamin B</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Vitamin C</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Vitamin D</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Vitamin E</h5>
                            <ion-item>
                                <ion-label position="floating">Grams</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Percent</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Sugar</h5>
                            <ion-item>
                                <ion-label position="floating">Total</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Added</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                        </ion-item-group>

                        <ion-item-group>
                            <h5>Sugar Alcohol</h5>
                            <ion-item>
                                <ion-label position="floating">Total</ion-label>
                                <ion-input type="text"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-label position="floating">Added</ion-label>
                                <ion-input type="text"></ion-input>
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
                                    <ion-button href="/food/list">
                                        <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
                                    </ion-button>
                                </ion-buttons>
                                {
                                    this.foodItem.calories > 0 && this.foodItem.name
                                        ? <ion-buttons slot="end">
                                            <ion-button>Create</ion-button>
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