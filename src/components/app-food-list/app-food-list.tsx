import { Component, h, Listen, State } from '@stencil/core';
import { IFoodItem } from '../../interfaces';
import { MOCKFOODITEMS } from '../../helpers/mockData';

@Component({
    tag: 'app-food-list',
    styleUrl: 'app-food-list.css'
})

export class AppFoodList {

    @State() foodItems: IFoodItem[] = [];
    @State() frequentFoodItems: IFoodItem[] = [];

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
            this.foodItems = [...MOCKFOODITEMS];
        } else {
            this.foodItems = [];
        }
    }

    getFrequentFoodItems() {
        this.frequentFoodItems = [...MOCKFOODITEMS.reverse()];
    }

    goBack() {
        const ionNav = document.querySelector('ion-nav');
        ionNav.pop();
    }

    getBarcode() {
        const ionSearch = document.querySelector('ion-searchbar');
        ionSearch.value = 'test1';
    }

    render() {
        return [
            <ion-header >
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
                            <ion-searchbar animated debounce={500} spellcheck={true} autocomplete="on" placeholder="Look for meal or snacks!"></ion-searchbar>
                            <ion-buttons slot="end">
                                <ion-button onClick={this.getBarcode.bind(this)}>
                                    <ion-icon slot="icon-only" name="barcode"></ion-icon>
                                </ion-button>
                                <ion-button href="/food/create">
                                    Create new food
                                </ion-button>
                            </ion-buttons>
                        </ion-toolbar>
                }
            </ion-header>
            ,
            <ion-content class="ion-padding">
                <ion-list lines="none">
                    {
                        this.foodItems.length > 0
                            ? this.foodItems.map((foodItem, index) =>
                                <ion-item-group>
                                    {
                                        index % 2
                                            ? <ion-item-divider color="secondary">
                                                <ion-label>{foodItem.name} </ion-label>
                                            </ion-item-divider>
                                            : <ion-item-divider color="tertiary">
                                                <ion-label>{foodItem.name} </ion-label>
                                            </ion-item-divider>
                                    }
                                    <ion-item>
                                        <ion-label>
                                            {foodItem.servingSize.amount} {foodItem.servingSize.measurement}
                                        </ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>Servings per Container {foodItem.servingPerContainer}</ion-label>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label>{foodItem.calories} calories</ion-label>
                                    </ion-item>
                                </ion-item-group>
                            )
                            : <ion-item-header>
                                <ion-label>Recent</ion-label>
                            </ion-item-header>
                    }
                    {
                        this.frequentFoodItems.length > 0 && this.foodItems.length <= 0
                            ? this.frequentFoodItems.map((foodItem, index) =>
                                <ion-item-group>
                                    <ion-item-group>
                                        {
                                            index % 2
                                                ? <ion-item-divider color="tertiary">
                                                    <ion-label>{foodItem.name} </ion-label>
                                                </ion-item-divider>
                                                : <ion-item-divider color="secondary">
                                                    <ion-label>{foodItem.name} </ion-label>
                                                </ion-item-divider>
                                        }
                                        <ion-item>
                                            <ion-label>
                                                {foodItem.servingSize.amount} {foodItem.servingSize.measurement}
                                            </ion-label>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>Servings per Container {foodItem.servingPerContainer}</ion-label>
                                        </ion-item>
                                        <ion-item>
                                            <ion-label>{foodItem.calories} calories</ion-label>
                                        </ion-item>
                                    </ion-item-group>
                                </ion-item-group>
                            )
                            : ''
                    }
                </ion-list>
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
                            <ion-searchbar animated debounce={500} spellcheck={true} autocomplete="on" placeholder="Look for meal or snacks!"></ion-searchbar>
                            <ion-buttons slot="end">
                                <ion-button onClick={this.getBarcode.bind(this)}>
                                    <ion-icon slot="icon-only" name="barcode"></ion-icon>
                                </ion-button>
                                <ion-button href="/food/create">
                                    Create new food
                                </ion-button>
                            </ion-buttons>
                        </ion-toolbar>
                        : ''
                }
            </ion-footer>
        ]
    }
}
