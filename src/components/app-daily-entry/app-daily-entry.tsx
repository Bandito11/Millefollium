import { Component, h } from '@stencil/core';
import { IFoodProduct, IEntry } from '../../interfaces';
import { getFoodProduct, addToDaily } from '../../services/db';
import { foodNameToUppercase, mealTypes } from '../../helpers/utils';
import { alertController, modalController } from '@ionic/core';

@Component({
    tag: 'app-daily-entry',
    styleUrl: 'app-daily-entry.css'
})
export class AppDailyEntry {

    foodItem: IFoodProduct & LokiObj;
    servingSizeInput = '1';
    radioItems = [
        { label: 'Breakfast', value: mealTypes.breakfast },
        { label: 'Breakfast Snack', value: mealTypes.breakfastSnack },
        { label: 'Lunch', value: mealTypes.lunch },
        { label: 'Lunch Snack', value: mealTypes.lunchSnack },
        { label: 'Dinner', value: mealTypes.dinner },
        { label: 'Dinner Snack', value: mealTypes.dinnerSnack }
    ];;

    componentWillLoad() {
        const modalElement = document.querySelector('ion-modal');
        const $loki = modalElement.componentProps.$loki;
        const response = getFoodProduct($loki);
        if (response.success) {
            this.foodItem = response.data;
        } else {
            console.error(response.error);
        }
        window.location.hash = '';
        window.onhashchange = () => this.goBack();
    }

    async goBack() {
        await modalController.dismiss();
    }

    addToDaily() {
        let entry: IEntry = {
            type: document.querySelector('ion-radio-group').value,
            date: new Date(),
            productId: this.foodItem.$loki.toString(),
            consumedSize: this.servingSizeInput
        };
        if (!document.querySelector('ion-radio-group').value) {
            entry = {
                ...entry,
                type: mealTypes.breakfast
            }
        }
        const response = addToDaily(entry);
        if (response.success) {
            this.displayMessage({
                header: 'Success!',
                message: response.message,
                event: this.goBack
            })
        } else {
            this.displayMessage({
                header: 'Error!',
                message: response.error
            })
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

    async askIfWantToSave() {
        const alert = await alertController.create({
            header: 'Warning!',
            message: `Do you want to save ${this.foodItem.name}?`,
            buttons: [{
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary'
            }, {
                text: 'OK',
                handler: () => {
                    this.addToDaily();
                }
            }]
        });
        await alert.present();
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
                <form>
                    <ion-list lines="none">
                        <ion-item>
                            <ion-label position="fixed">Serving Size</ion-label>
                            <ion-input type="number" value={this.servingSizeInput} onInput={e => this.servingSizeInput = e.target['value']}></ion-input>
                            <ion-label>{this.foodItem.servingSize.measurement}</ion-label>
                        </ion-item>
                        <ion-grid>
                            <ion-radio-group name="meal">
                                <h3>Meal Time</h3>
                                <ion-row>
                                    {
                                        this.radioItems.map(entry =>
                                            <ion-col>
                                                <ion-item>
                                                    <ion-label>{entry.label}</ion-label>
                                                    <ion-radio value={entry.value}></ion-radio>
                                                </ion-item>
                                            </ion-col>
                                        )
                                    }
                                </ion-row>
                            </ion-radio-group>
                        </ion-grid>
                    </ion-list>
                    <ion-button onClick={() => this.askIfWantToSave()} fill="solid" expand="full">
                        Add to Daily
                        </ion-button>
                </form>
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