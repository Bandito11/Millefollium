import { Component, h } from '@stencil/core';
import { IFoodProduct } from '../../interfaces';
import { getFoodProduct } from '../../services/db';
import { foodNameToUppercase } from '../../helpers/utils';
import { readImageFile } from '../../services/filesystem';
import { modalController } from '@ionic/core';


@Component({
    tag: 'app-view-food',
    styleUrl: 'app-view-food.css'
})
export class AppViewFood {

    foodItem: IFoodProduct;
    imgUrl: string;

    async componentWillLoad() {
        const modalElement = document.querySelector('ion-modal');
        const $loki = modalElement.componentProps.$loki;
        const response = getFoodProduct($loki);
        if (response.success) {
            this.foodItem = response.data;
            const image = await readImageFile(this.foodItem.name);
            this.imgUrl = image.data;
        } else {
            console.error(response.error);
        }
        window.location.hash = '';
        window.onhashchange = () => this.goBack();
    }

    goBack() {
        return modalController.dismiss();
    }

    render() {
        return [
            <div>
                {
                    navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
                        ? ''
                        : <ion-header>
                            <ion-toolbar color="primary">
                                <ion-title>Nutrition Facts</ion-title>
                                <ion-buttons slot="start">
                                    <ion-button onClick={() => this.goBack()} >
                                        <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
                                    </ion-button>
                                </ion-buttons>
                            </ion-toolbar>
                        </ion-header>
                }
            </div>,
            <ion-content class="ion-padding">
                <h1>{foodNameToUppercase(this.foodItem.name)}</h1>
                <img src={this.imgUrl} alt={`A picture of ${this.foodItem.name}`} />
                <p>Serving size {this.foodItem.servingSize.size} {this.foodItem.servingSize.measurement} ({this.foodItem.servingSize.grams}g)</p>
                <p>Servings per Container about {this.foodItem.servingPerContainer}</p>

                <ion-item-divider>
                    <p><span class="thick">Amounts Per Serving</span></p>
                </ion-item-divider>
                <p class="ion-margin-start">Calories {this.foodItem.calories}</p>

                <ion-grid>
                    <ion-row>
                        <ion-col></ion-col>
                        <ion-col class="ion-text-center">
                            <p>% Daily Value*</p>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <p><span class="thick">Total Fat</span> {this.foodItem.fat.total.grams}g</p>
                        </ion-col>
                        <ion-col class="ion-text-center ion-margin-start">
                            <p>{this.foodItem.fat.total.percent}%</p>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col class="ion-margin-start">
                            <p>Saturated Fat {this.foodItem.fat.saturated.grams}g</p>
                        </ion-col>
                        <ion-col class="ion-text-center">
                            <p>{this.foodItem.fat.saturated.percent}%</p>
                        </ion-col>
                    </ion-row>
                    {this.foodItem.fat.monounsaturated.grams > '0' || this.foodItem.fat.monounsaturated.percent > '0'
                        ? <ion-row>
                            <ion-col class="ion-margin-start">
                                <p>Monounsaturated Fat {this.foodItem.fat.monounsaturated.grams}g</p>
                            </ion-col>
                            <ion-col class="ion-text-center">
                                <p>{this.foodItem.fat.monounsaturated.percent}%</p>
                            </ion-col>
                        </ion-row>
                        : ''
                    }

                    {this.foodItem.fat.polyunsaturated.grams > '0' || this.foodItem.fat.polyunsaturated.percent > '0'
                        ? <ion-row>
                            <ion-col class="ion-margin-start">
                                <p>Polyunsaturated Fat {this.foodItem.fat.polyunsaturated.grams}g</p>
                            </ion-col>
                            <ion-col class="ion-text-center">
                                <p>{this.foodItem.fat.polyunsaturated.percent}%</p>
                            </ion-col>
                        </ion-row>
                        : ''
                    }

                    {this.foodItem.fat.trans.grams > '0' || this.foodItem.fat.trans.percent > '0'
                        ? <ion-row>
                            <ion-col class="ion-margin-start">
                                <p>Trans Fat {this.foodItem.fat.trans.grams}g</p>
                            </ion-col>
                            <ion-col class="ion-text-center">
                                <p>{this.foodItem.fat.trans.percent}%</p>
                            </ion-col>
                        </ion-row>
                        : ''
                    }

                    <ion-row>
                        <ion-col>
                            <p><span class="thick">Cholesterol</span> {this.foodItem.cholesterol.grams}mg</p>
                        </ion-col>
                        <ion-col class="ion-text-center ion-margin-start">
                            <p>{this.foodItem.cholesterol.percent}%</p>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <p><span class="thick">Sodium</span> {this.foodItem.sodium.grams}mg</p>
                        </ion-col>
                        <ion-col class="ion-text-center ion-margin-start">
                            <p>{this.foodItem.sodium.percent}%</p>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <p><span class="thick">Total Carbohydrate</span> {this.foodItem.totalCarbohydrates.grams}g</p>
                        </ion-col>
                        <ion-col class="ion-text-center ion-margin-start ion-margin-start">
                            <p>{this.foodItem.totalCarbohydrates.percent}%</p>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col class="ion-margin-start">
                            <p>Dietary Fiber {this.foodItem.dietaryFiber.grams}g</p>
                        </ion-col>
                        <ion-col class="ion-text-center">
                            <p>{this.foodItem.dietaryFiber.percent}%</p>
                        </ion-col>
                    </ion-row>

                    <ion-row class="ion-margin-start">
                        <ion-col>
                            <p>Sugars {this.foodItem.sugar.total.grams}g</p>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <p><span class="thick">Protein</span> {this.foodItem.protein.grams}g</p>
                        </ion-col>
                        <ion-col class="ion-text-center ion-margin-start">
                            <p>{this.foodItem.protein.percent}%</p>
                        </ion-col>
                    </ion-row>

                    {this.foodItem.potassium.grams > '0' || this.foodItem.potassium.percent > '0'
                        ? <ion-row>
                            <ion-col>
                                <p><span class="thick">Potassium</span> {this.foodItem.potassium.grams}g</p>
                            </ion-col>
                            <ion-col class="ion-text-center ion-margin-start">
                                <p>{this.foodItem.potassium.percent}%</p>
                            </ion-col>
                        </ion-row>
                        : ''
                    }

                    {this.foodItem.phosphorus.grams > '0' || this.foodItem.phosphorus.percent > '0'
                        ? <ion-row>
                            <ion-col>
                                <p><span class="thick">Phosphorous</span> {this.foodItem.phosphorus.grams}g</p>
                            </ion-col>
                            <ion-col class="ion-text-center ion-margin-start">
                                <p>{this.foodItem.phosphorus.percent}%</p>
                            </ion-col>
                        </ion-row>
                        : ''
                    }

                    <ion-item-divider class="ion-no-padding">
                        <ion-label class="ion-margin-start">
                            Vitamins and Minerals
                            </ion-label>
                    </ion-item-divider>

                    <ion-row>
                        <ion-col>
                            <p>Vitamin A</p>
                        </ion-col>
                        <ion-col class="ion-text-center ion-margin-start">
                            <p>{this.foodItem.vitamin.A.percent}%</p>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <p>Vitamin C</p>
                        </ion-col>
                        <ion-col class="ion-text-center ion-margin-start">
                            <p>{this.foodItem.vitamin.C.percent}%</p>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <p>Calcium</p>
                        </ion-col>
                        <ion-col class="ion-text-center ion-margin-start">
                            <p>{this.foodItem.calcium.percent}%</p>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <p>Iron</p>
                        </ion-col>
                        <ion-col class="ion-text-center ion-margin-start">
                            <p>{this.foodItem.iron.percent}%</p>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <p>Niacin</p>
                        </ion-col>
                        <ion-col class="ion-text-center ion-margin-start">
                            <p>{this.foodItem.niacin.percent}%</p>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <p>Vitamin D</p>
                        </ion-col>
                        <ion-col class="ion-text-center ion-margin-start">
                            <p>{this.foodItem.vitamin.D.percent}%</p>
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col>
                            <p>Vitamin E</p>
                        </ion-col>
                        <ion-col class="ion-text-center ion-margin-start">
                            <p>{this.foodItem.vitamin.E.percent}%</p>
                        </ion-col>
                    </ion-row>

                </ion-grid>

                <h6>* Percent Daily Values are based on a 2000 calorie diet.</h6>
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
                            </ion-toolbar>
                        </ion-footer>
                        : ''
                }
            </div>
        ]
    }
}