import { Component, h, Listen, State } from '@stencil/core';
import { IFoodProduct, IUSDA } from '../../interfaces';
import { getFoodProducts } from '../../services/db';
import { foodNameToUppercase } from '../../helpers/utils';
import { actionSheetController, modalController } from '@ionic/core';
import { scan, stopScan } from '../../services/quagga';
declare const localforage;

@Component({
    tag: 'app-food-list',
    styleUrl: 'app-food-list.css'
})

export class AppFoodList {

    @State() foodItems: (IFoodProduct & LokiObj)[] = [];
    @State() frequentFoodItems: (IFoodProduct & LokiObj)[] = [];
    toggleBarcode = true;
    foodDataWorker;
    usdaData: IUSDA[];
    
    componentWillLoad() {
        this.getFrequentFoodItems();
        if (typeof (this.foodDataWorker) == "undefined") {
            this.foodDataWorker = new Worker("workers/usda-file.js");
        }
        this.foodDataWorker.onmessage = function (event) {
            this.usdaData = event.data;
        };
    }

    @Listen('ionChange')
    handleIonChange(ev) {
        this.queryByNameOrID(ev.detail.value);
    }

    queryByNameOrID(value) {
        const query = value;
        if (query) {
            const response = getFoodProducts(query);
            if (response.success) {
                this.foodItems = response.data;
                if (this.frequentFoodItems.length > 0) {
                    response.data.forEach(data => {
                        let found;
                        this.frequentFoodItems.forEach(food => {
                            if (data.name === food.name) {
                                found = true;
                            }
                        });
                        if (!found) {
                            this.frequentFoodItems = [...this.frequentFoodItems, data];
                        }
                    });
                } else {
                    this.frequentFoodItems = response.data;
                }
                if (this.frequentFoodItems.length > 9) {
                    for (let i = 0; i < this.frequentFoodItems.length - 9; i++) {
                        this.frequentFoodItems.pop();
                    }
                }
            }
        } else {
            this.foodItems = [];
        }
        let frequentFoodItems = [];
        this.frequentFoodItems.forEach(food => {
            frequentFoodItems.push(JSON.stringify(food));
        });
        localforage.setItem('frequentFoodItems', frequentFoodItems);
    }

    getFrequentFoodItems() {
        localforage.getItem('frequentFoodItems', (err, value: string[]) => {
            if (err) {
                console.error(err);
            } else {
                this.frequentFoodItems = value.map(foodProduct => JSON.parse(foodProduct));
            }
        });
    }

    goBack() {
        const ionNav = document.querySelector('ion-nav');
        ionNav.pop();
    }

    async getBarcode() {
        if (this.toggleBarcode) {
            this.toggleBarcode = false;
            try {
                const ionSearch = document.querySelector('ion-searchbar');
                const resultObject = await scan(document.querySelector('#food-list-barcode'));
                ionSearch.value = resultObject.codeResult.code;
                this.queryByNameOrID(resultObject.codeResult.code);
            } catch (error) {
                console.error(error);
            }
            document.querySelector('#food-list-barcode').innerHTML = stopScan();
        } else {
            this.toggleBarcode = true;
            document.querySelector('#food-list-barcode').innerHTML = stopScan();
        }
    }

    async presentCreateModal(componentProps: { foodProduct?: IFoodProduct, mode: string }) {
        const ionSearch = document.querySelector('ion-searchbar');
        const modal = await modalController.create({
            component: 'app-form-food',
            componentProps: componentProps
        });
        ionSearch.value = '';
        await modal.present();
    }

    async showSelectionWindow(foodProduct: (IFoodProduct & LokiObj)) {
        const actionSheet = await actionSheetController.create({
            header: foodNameToUppercase(foodProduct.name),
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Add to Daily',
                    role: 'submit',
                    cssClass: 'primary',
                    handler: () => {
                        modalController.create({
                            component: 'app-daily-entry',
                            componentProps: {
                                foodProduct: foodProduct
                            }
                        }).then(modal => modal.present());
                    }
                },
                {
                    text: `View ${foodProduct.name}`,
                    role: 'view',
                    cssClass: 'tertiary',
                    handler: async () => {
                        const modal = await modalController.create({
                            component: 'app-view-food',
                            componentProps: {
                                foodProduct: foodProduct,
                                mode: 'create'
                            }
                        });
                        await modal.present();
                    }
                }, {
                    text: `Edit ${foodProduct.name}`,
                    cssClass: 'secondary',
                    handler: () => {
                        this.presentCreateModal({ mode: 'edit', foodProduct: foodProduct });
                    }
                }
            ]
        });
        return await actionSheet.present();
    }

    render() {
        return [
            <ion-header>
                {
                    navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
                        ? ''
                        :
                        <ion-toolbar color="primary">
                            <ion-buttons slot="start">
                                <ion-button href="/">
                                    <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
                                </ion-button>
                            </ion-buttons>
                            <ion-searchbar animated debounce={500} spellcheck={true} autocomplete="on"></ion-searchbar>
                            <ion-buttons slot="end">
                                <ion-button onClick={this.getBarcode.bind(this)}>
                                    <ion-icon slot="icon-only" name="barcode"></ion-icon>
                                </ion-button>
                                <ion-button onClick={() => this.presentCreateModal({ mode: 'create' })}>
                                    Create
                                </ion-button>
                            </ion-buttons>
                        </ion-toolbar>
                }
            </ion-header>
            ,
            <ion-content class="ion-padding">
                {
                    this.foodItems.length > 0
                        ? this.foodItems.map((foodItem, index) =>
                            <ion-card onClick={_ => this.showSelectionWindow(foodItem)}>
                                {
                                    index % 2
                                        ? <ion-card-header color="secondary">
                                            <ion-label>{foodNameToUppercase(foodItem.name)} </ion-label>
                                        </ion-card-header>
                                        : <ion-card-header color="tertiary">
                                            <ion-label>{foodNameToUppercase(foodItem.name)} </ion-label>
                                        </ion-card-header>
                                }
                                <ion-item lines="none">
                                    <ion-label>
                                        Serving Size {foodItem.servingSize.size} {foodItem.servingSize.measurement}
                                    </ion-label>
                                </ion-item>
                                <ion-item lines="none">
                                    <ion-label>Servings per Container about {foodItem.servingPerContainer}</ion-label>
                                </ion-item>
                                <ion-item lines="none">
                                    <ion-label>{foodItem.calories} calories</ion-label>
                                </ion-item>
                            </ion-card>
                        )
                        : <h1>Recent</h1>
                }
                <div id="food-list-barcode"></div>
                {
                    this.frequentFoodItems.length > 0 && this.foodItems.length <= 0
                        ? this.frequentFoodItems.map((foodItem, index) =>
                            <ion-card onClick={_ => this.showSelectionWindow(foodItem)}>
                                {
                                    index % 2
                                        ? <ion-card-header color="tertiary">
                                            <ion-label>{foodNameToUppercase(foodItem.name)} </ion-label>
                                        </ion-card-header>
                                        : <ion-card-header color="secondary">
                                            <ion-label>{foodNameToUppercase(foodItem.name)} </ion-label>
                                        </ion-card-header>
                                }
                                <ion-item lines="none">
                                    <ion-label>
                                        {foodItem.servingSize.size} {foodItem.servingSize.measurement}
                                    </ion-label>
                                </ion-item>
                                <ion-item lines="none">
                                    <ion-label>Servings per Container {foodItem.servingPerContainer}</ion-label>
                                </ion-item>
                                <ion-item lines="none">
                                    <ion-label>{foodItem.calories} calories</ion-label>
                                </ion-item>
                            </ion-card>
                        )
                        : ''
                }
            </ion-content>
            ,
            <ion-footer>
                {
                    navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
                        ?
                        <ion-toolbar color="primary">
                            <ion-buttons slot="start">
                                <ion-button href="/">
                                    <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
                                </ion-button>
                            </ion-buttons>
                            <ion-searchbar animated debounce={500} spellcheck={true} autocomplete="on"></ion-searchbar>
                            <ion-buttons slot="end">
                                <ion-button onClick={this.getBarcode.bind(this)}>
                                    <ion-icon slot="icon-only" name="barcode"></ion-icon>
                                </ion-button>
                                <ion-button onClick={() => this.presentCreateModal({ mode: 'create' })}>
                                    Create
                                </ion-button>
                            </ion-buttons>
                        </ion-toolbar>
                        : ''
                }
            </ion-footer>
        ]
    }
}
