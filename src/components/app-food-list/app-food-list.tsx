import { Component, h, Listen, State } from '@stencil/core';
import { IFoodItem } from '../../interfaces';
import { getFoodProducts } from '../../services/db';
import { foodNameToUppercase } from '../../helpers/utils';

@Component({
    tag: 'app-food-list',
    styleUrl: 'app-food-list.css'
})

export class AppFoodList {

    @State() foodItems: (IFoodItem & LokiObj)[] = [];
    @State() frequentFoodItems: (IFoodItem & LokiObj)[] = [];

    componentWillLoad() {
        this.getFrequentFoodItems();
    }

    componentDidLoad() {
        const searchBar = document.querySelector('ion-searchbar');
        searchBar.setFocus();
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
                this.foodItems = [...response.data];
            }
        } else {
            this.foodItems = [];
        }
    }

    getFrequentFoodItems() {
        // this.frequentFoodItems = [...MOCKFOODITEMS.reverse()];
    }

    goBack() {
        const ionNav = document.querySelector('ion-nav');
        ionNav.pop();
    }

    getBarcode() {
        const ionSearch = document.querySelector('ion-searchbar');
        ionSearch.value = 'test1';
    }

    async presentCreateModal(componentProps: { $loki?: number, mode: string }) {
        const ionSearch = document.querySelector('ion-searchbar');
        const modalController = document.querySelector('ion-modal-controller');
        // create the modal with the `modal-page` component
        const modal = await modalController.create({
            component: 'app-form-food',
            componentProps: componentProps
        });
        ionSearch.value = '';
        // present the modal
        await modal.present();
    }

    async showSelectionWindow(foodItem: (IFoodItem & LokiObj)) {
        const actionSheetController = document.querySelector('ion-action-sheet-controller');
        const actionSheet = await actionSheetController.create({
            header: foodNameToUppercase(foodItem.name),
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: `View ${foodItem.name}`,
                    role: 'view',
                    cssClass: 'tertiary',
                    handler: async () => {
                        const modalController = document.querySelector('ion-modal-controller');
                        const modal = await modalController.create({
                            component: 'app-view-food',
                            componentProps: {
                                $loki: foodItem.$loki,
                                mode: 'create'
                            }
                        });
                        await modal.present();
                    }
                }, {
                    text: `Edit ${foodItem.name}`,
                    cssClass: 'secondary',
                    handler: () => {
                        this.presentCreateModal({ mode: 'edit', $loki: foodItem.$loki });
                    }
                },
                {
                    text: 'Add to Daily',
                    role: 'add',
                    cssClass: 'primary',
                    handler: () => {
                        const modalController = document.querySelector('ion-modal-controller');
                        modalController.create({
                            component: 'app-daily-entry',
                            componentProps: {
                                $loki: foodItem.$loki
                            }
                        }).then(modal => modal.present());
                    }
                }
            ]
        });
        return await actionSheet.present();
    }

    render() {
        return [
            <ion-action-sheet-controller></ion-action-sheet-controller>,
            <ion-modal-controller></ion-modal-controller>,
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
