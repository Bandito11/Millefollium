import { Component, h } from '@stencil/core';
import { IFoodItem } from '../../interfaces';
import { getFoodItem } from '../../services/db';
import { foodNameToUppercase } from '../../helpers/utils';


@Component({
    tag: 'app-view-food',
    styleUrl: 'app-view-food.css'
})
export class AppViewFood {

  foodItem: IFoodItem;

    componentWillLoad() {
        const modalElement = document.querySelector('ion-modal');
        const $loki = modalElement.componentProps.$loki;
        const response = getFoodItem($loki);
        if(response.success){
            this.foodItem= response.data;
        } else {
            console.error(response.error);
        }
    }

    goBack() {
        const modal = document.querySelector('ion-modal-controller');
        return modal.dismiss();
    }

    render() {
        return [
            <div>
                {
                    navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
                        ? ''
                        : <ion-header>
                            <ion-toolbar color="primary">
                                <ion-title>{foodNameToUppercase(this.foodItem.name)}</ion-title>
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
            </ion-content>,
            <div>
                {
                    navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
                        ? <ion-footer>
                            <ion-toolbar color="primary">
                                <ion-title>{foodNameToUppercase(this.foodItem.name)}</ion-title>
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