import { Component, h, Prop } from "@stencil/core";
import { IDaily, IMeal } from "../../interfaces";

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
                        {this.daily.breakfast.map((meal: IMeal) =>
                            <div>
                                <ion-item>
                                    <ion-label class='ion-text-wrap'>{meal.name}</ion-label>
                                    <ion-label class='ion-text-wrap'>{meal.calories} calories</ion-label>
                                </ion-item>
                            </div>
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
                            <div>
                                <ion-item>
                                    <ion-label class='ion-text-wrap'>{meal.name}</ion-label>
                                    <ion-label class='ion-text-wrap'>{meal.calories} calories</ion-label>
                                </ion-item>
                            </div>
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
                            <div>
                                <ion-item>
                                    <ion-label class='ion-text-wrap'>{meal.name}</ion-label>
                                    <ion-label class='ion-text-wrap'>{meal.calories} calories</ion-label>
                                </ion-item>
                            </div>
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
                            <div>
                                <ion-item>
                                    <ion-label class='ion-text-wrap'>{meal.name}</ion-label>
                                    <ion-label class='ion-text-wrap'>{meal.calories} calories</ion-label>
                                </ion-item>
                            </div>
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
                            <div>
                                <ion-item>
                                    <ion-label class='ion-text-wrap'>{meal.name}</ion-label>
                                    <ion-label class='ion-text-wrap'>{meal.calories} calories</ion-label>
                                </ion-item>
                            </div>
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
                            <div>
                                <ion-item>
                                    <ion-label class='ion-text-wrap'>{meal.name}</ion-label>
                                    <ion-label class='ion-text-wrap'>{meal.calories} calories</ion-label>
                                </ion-item>
                            </div>
                        )}
                    </ion-list>
                    : ''
                }
            </div>
        );
    }
}
