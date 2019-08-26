import { Component, h } from '@stencil/core';
import { IFoodItem } from '../../interfaces';
import { getFoodItem } from '../../services/db';
import { foodNameToUppercase } from '../../helpers/utils';


@Component({
    tag: 'app-daily-entry',
    styleUrl: 'app-daily-entry.css'
})
export class AppDailyEntry {

    foodItem: IFoodItem;

    componentWillLoad() {
        const modalElement = document.querySelector('ion-modal');
        const $loki = modalElement.componentProps.$loki;
        const response = getFoodItem($loki);
        if (response.success) {
            this.foodItem = response.data;
        } else {
            console.error(response.error);
        }
        window.location.hash = '';
        window.onhashchange = () => this.goBack();
    }

    async goBack() {
        const modal = document.querySelector('ion-modal-controller');
        await modal.dismiss();
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
                                <ion-button onClick={() => this.goBack()}>
                                    <ion-icon slot="icon-only" name="arrow-back"></ion-icon>
                                </ion-button>
                            </ion-buttons>
                        </ion-toolbar>
                }
            </ion-header>
            ,
            <ion-content class="ion-padding">
                <h1>{foodNameToUppercase(this.foodItem.name)}</h1>
            </ion-content>,
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
                        </ion-toolbar>
                        : ''
                }
            </ion-footer>
        ];
    }
}