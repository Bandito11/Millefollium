import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";
import {  oldIDaily, oldIMeal } from "../../interfaces";
import { toUpperCase } from "../../helpers/utils";
import { editDaily, deleteDaily, getDaily } from "../../services/db";
import { actionSheetController, alertController, modalController } from "@ionic/core";

@Component({
    tag: 'app-daily-list',
    styleUrl: 'app-daily-list.css'
})
export class AppDaily {
    @Prop() daily: oldIDaily;
    @Prop() breakfastCalories: number;
    @Prop() breakfastSnackCalories: number;
    @Prop() lunchCalories: number;
    @Prop() lunchSnackCalories: number;
    @Prop() dinnerCalories: number;
    @Prop() dinnerSnackCalories: number;
    @Prop() today: string;
    @Event() updatedDailyEntry: EventEmitter;

    async showSelectionWindow(meal: oldIMeal) {
        const actionSheet = await actionSheetController.create({
            header: toUpperCase(meal.name),
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: `Delete ${meal.name}`,
                    cssClass: 'tertiary',
                    handler: async () => {
                        this.askIfWantToSave({
                            header: 'Warning!',
                            message: `Do you want to delete ${meal.name}`,
                            buttons: [{
                                text: 'Cancel',
                                role: 'cancel',
                                cssClass: 'secondary'
                            }, {
                                text: 'OK',
                                handler: () => {
                                    this.deleteDailyEntry(meal);
                                }
                            }]
                        });
                    }
                }, {
                    text: `Edit ${meal.name}`,
                    cssClass: 'secondary',
                    handler: () => {
                        this.askIfWantToSave({
                            header: 'Warning!',
                            message: `Do you want to edit ${meal.name}`,
                            buttons: [{
                                text: 'Cancel',
                                role: 'cancel',
                                cssClass: 'secondary'
                            }, {
                                text: 'OK',
                                handler: () => {
                                    this.editDailyEntry(meal);
                                }
                            }]
                        });
                    }
                },
                {
                    text: `View ${meal.name}`,
                    cssClass: 'primary',
                    handler: async () => {
                        const modal = await modalController.create({
                            component: 'app-view-food',
                            componentProps: {
                                foodProduct: meal
                            }
                        });
                        modal.present();
                    }
                }
            ]
        });
        return await actionSheet.present();
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

    deleteDailyEntry(meal: oldIMeal) {
        const response = deleteDaily(meal);
        if (response.success) {
            this.updatedDailyEntry.emit();
        } else {
            console.error(response.error);
        }
    }

    async askIfWantToSave(options: { header: string, message: string, buttons }) {
        const alert = await alertController.create(options);
        await alert.present();
    }

    async editDailyEntry(meal: oldIMeal) {
        const servingSize = 1;
        const alert = await alertController.create({
            header: 'Change the serving size!',
            inputs: [
                {
                    name: 'servingSize',
                    id: 'servingSize',
                    value: servingSize,
                    type: 'number'
                }
            ],
            buttons: [{
                text: 'Cancel',
                role: 'cancel', 
                cssClass: 'secondary'
            }, {
                text: 'Ok',
                handler: (e) => {
                    const response = editDaily({ servingSize: e.servingSize, foodProduct: meal });
                    if (response.success) {
                        let dailyResponse;
                        if (this.today) {
                            dailyResponse = getDaily(new Date(this.today));
                        } else {
                            dailyResponse = getDaily(new Date(this.daily.date));
                        }
                        if (!dailyResponse.success) {
                            this.daily = {
                                ...this.daily,
                                breakfast: [],
                                breakfastSnack: [],
                                lunch: [],
                                lunchSnack: [],
                                dinner: [],
                                dinnerSnack: []
                            };
                        }
                        this.updatedDailyEntry.emit();
                    } else {
                        console.error(response.error);
                    }

                }
            }]
        });
        await alert.present();
    }

    render() {
        return (
            <div>
                {this.daily.breakfast.length > 0
                    ? <ion-list lines='none'>
                        <ion-list-header>
                            <ion-label>Breakfast</ion-label>
                        </ion-list-header>
                        <ion-item>
                            <ion-label>
                                {this.breakfastCalories} calories consumed
                            </ion-label>
                        </ion-item>
                        {this.daily.breakfast.map((meal: oldIMeal) =>
                            <ion-item onClick={() => this.showSelectionWindow(meal)}>
                                <ion-label class='ion-text-wrap'>{toUpperCase(meal.name)}</ion-label>
                                <ion-label class='ion-text-wrap'>{meal.calories} calories</ion-label>
                            </ion-item>
                        )}
                    </ion-list>
                    : ''
                }

                {this.daily.breakfastSnack.length > 0
                    ? <ion-list lines='none'>
                        <ion-list-header>
                            <ion-label>Breakfast Snack</ion-label>
                        </ion-list-header>
                        <ion-item>
                            <ion-label>
                                {this.breakfastSnackCalories} calories consumed
                            </ion-label>
                        </ion-item>
                        {this.daily.breakfastSnack.map((meal: oldIMeal) =>
                            <ion-item onClick={() => this.showSelectionWindow(meal)}>
                                <ion-label class='ion-text-wrap'>{toUpperCase(meal.name)}</ion-label>
                                <ion-label class='ion-text-wrap'>{meal.calories} calories</ion-label>
                            </ion-item>
                        )}
                    </ion-list>
                    : ''
                }

                {this.daily.lunch.length > 0
                    ? <ion-list lines='none'>
                        <ion-list-header>
                            <ion-label>Lunch</ion-label>
                        </ion-list-header>
                        <ion-item>
                            <ion-label>
                                {this.lunchCalories} calories consumed
                            </ion-label>
                        </ion-item>

                        {this.daily.lunch.map((meal: oldIMeal) =>
                            <ion-item onClick={() => this.showSelectionWindow(meal)}>
                                <ion-label class='ion-text-wrap'>{toUpperCase(meal.name)}</ion-label>
                                <ion-label class='ion-text-wrap'>{meal.calories} calories</ion-label>
                            </ion-item>
                        )}
                    </ion-list>
                    : ''
                }

                {this.daily.lunchSnack.length > 0
                    ? <ion-list lines='none'>
                        <ion-list-header>
                            <ion-label>Lunch Snack</ion-label>
                        </ion-list-header>
                        <ion-item>
                            <ion-label>
                                {this.lunchSnackCalories} calories consumed
                            </ion-label>
                        </ion-item>

                        {this.daily.lunchSnack.map((meal: oldIMeal) =>
                            <ion-item onClick={() => this.showSelectionWindow(meal)}>
                                <ion-label class='ion-text-wrap'>{toUpperCase(meal.name)}</ion-label>
                                <ion-label class='ion-text-wrap'>{meal.calories} calories</ion-label>
                            </ion-item>
                        )}
                    </ion-list>
                    : ''
                }

                {this.daily.dinner.length > 0
                    ? <ion-list lines='none'>
                        <ion-list-header>
                            <ion-label>Dinner</ion-label>
                        </ion-list-header>
                        <ion-item>
                            <ion-label>
                                {this.dinnerCalories} calories consumed
                            </ion-label>
                        </ion-item>

                        {this.daily.dinner.map((meal: oldIMeal) =>
                            <ion-item onClick={() => this.showSelectionWindow(meal)}>
                                <ion-label class='ion-text-wrap'>{toUpperCase(meal.name)}</ion-label>
                                <ion-label class='ion-text-wrap'>{meal.calories} calories</ion-label>
                            </ion-item>
                        )}
                    </ion-list>
                    : ''
                }

                {this.daily.dinnerSnack.length > 0
                    ? <ion-list lines='none'>
                        <ion-list-header>
                            <ion-label>Dinner Snack</ion-label>
                        </ion-list-header>
                        <ion-item>
                            <ion-label>
                                {this.dinnerSnackCalories} calories consumed
                            </ion-label>
                        </ion-item>

                        {this.daily.dinnerSnack.map((meal: oldIMeal) =>
                            <ion-item onClick={() => this.showSelectionWindow(meal)}>
                                <ion-label class='ion-text-wrap'>{toUpperCase(meal.name)}</ion-label>
                                <ion-label class='ion-text-wrap'>{meal.calories} calories</ion-label>
                            </ion-item>
                        )}
                    </ion-list>
                    : ''
                }
            </div>
        );
    }
}
