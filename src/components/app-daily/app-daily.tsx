import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";
import { IDaily, IMeal } from "../../interfaces";
import { foodNameToUppercase } from "../../helpers/utils";
import { editDaily, deleteDaily, getDaily } from "../../services/db";

@Component({
    tag: 'app-daily',
    styleUrl: 'app-daily.css'
})
export class AppDaily {
    @Prop() daily: IDaily;
    @Prop() breakfastCalories: number;
    @Prop() breakfastSnackCalories: number;
    @Prop() lunchCalories: number;
    @Prop() lunchSnackCalories: number;
    @Prop() dinnerCalories: number;
    @Prop() dinnerSnackCalories: number;
    @Prop() today: string;
    @Event() updatedDailyEntry: EventEmitter;

    async showSelectionWindow(meal: IMeal) {
        const actionSheetController = document.querySelector('ion-action-sheet-controller');
        const actionSheet = await actionSheetController.create({
            header: foodNameToUppercase(meal.name),
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: `Delete ${meal.name} daily entry?`,
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
                                    this.deleteDailyEntry(meal.id);
                                    const response = getDaily(new Date(this.daily.date));
                                    if (response.success) {
                                        this.updatedDailyEntry.emit()
                                    } else {
                                        this.daily = {
                                            ...this.daily,
                                            breakfast: [],
                                            breakfastSnack: [],
                                            lunch: [],
                                            lunchSnack: [],
                                            dinner: [],
                                            dinnerSnack: []
                                        };
                                        this.updatedDailyEntry.emit(this.daily);
                                    }
                                }
                            }]
                        });
                    }
                }, {
                    text: `Edit ${meal.name} daily entry?`,
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
                                    this.editDailyEntry(meal.id);
                                }
                            }]
                        });
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
        const alertController = document.querySelector('ion-alert-controller');
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

    deleteDailyEntry(id: number) {
        const response = deleteDaily(id);
        if (!response.success) {
            console.error(response.error);
        }
    }

    async askIfWantToSave(options: { header: string, message: string, buttons }) {
        const alertController = document.querySelector('ion-alert-controller');
        const alert = await alertController.create(options);
        await alert.present();
    }

    async editDailyEntry(id: number) {
        const alertController = document.querySelector('ion-alert-controller');
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
                    const response = editDaily({ servingSize: e.servingSize, id: id });
                    if (response.success) {
                        let dailyResponse;
                        if (this.today) {
                            dailyResponse = getDaily(new Date(this.today));
                        } else {
                            dailyResponse = getDaily(new Date(this.daily.date));
                        }
                        if (dailyResponse.success) {
                            this.updatedDailyEntry.emit()
                        } else {
                            this.daily = {
                                ...this.daily,
                                breakfast: [],
                                breakfastSnack: [],
                                lunch: [],
                                lunchSnack: [],
                                dinner: [],
                                dinnerSnack: []
                            }
                        }
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
                <ion-action-sheet-controller></ion-action-sheet-controller>
                <ion-alert-controller></ion-alert-controller>
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
                        {this.daily.breakfast.map((meal: IMeal) =>
                            <ion-item onClick={() => this.showSelectionWindow(meal)}>
                                <ion-label class='ion-text-wrap'>{foodNameToUppercase(meal.name)}</ion-label>
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
                        {this.daily.breakfastSnack.map((meal: IMeal) =>
                            <ion-item onClick={() => this.showSelectionWindow(meal)}>
                                <ion-label class='ion-text-wrap'>{foodNameToUppercase(meal.name)}</ion-label>
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

                        {this.daily.lunch.map((meal: IMeal) =>
                            <ion-item onClick={() => this.showSelectionWindow(meal)}>
                                <ion-label class='ion-text-wrap'>{foodNameToUppercase(meal.name)}</ion-label>
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

                        {this.daily.lunchSnack.map((meal: IMeal) =>
                            <ion-item onClick={() => this.showSelectionWindow(meal)}>
                                <ion-label class='ion-text-wrap'>{foodNameToUppercase(meal.name)}</ion-label>
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

                        {this.daily.dinner.map((meal: IMeal) =>
                            <ion-item onClick={() => this.showSelectionWindow(meal)}>
                                <ion-label class='ion-text-wrap'>{foodNameToUppercase(meal.name)}</ion-label>
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

                        {this.daily.dinnerSnack.map((meal: IMeal) =>
                            <ion-item onClick={() => this.showSelectionWindow(meal)}>
                                <ion-label class='ion-text-wrap'>{foodNameToUppercase(meal.name)}</ion-label>
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
