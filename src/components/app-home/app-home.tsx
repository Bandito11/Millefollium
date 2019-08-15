import { Component, h } from '@stencil/core';
import { IDaily, IMeal } from '../../interfaces';
import { MOCKDAILY, MOCKENTRIES } from '../../helpers/mockData';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  daily: IDaily;
  pastDailyEntries: IDaily & Date[];
  dailyCalories: number;
  breakfastTotalCalories: number;
  breakfastSnackTotalCalories: number;
  lunchTotalCalories: number;
  lunchSnackTotalCalories: number;
  dinnerTotalCalories: number;
  dinnerSnackTotalCalories: number;
  totalFat: string;
  dailyProtein: string;
  dailyCarbs: string;

  componentWillLoad() {
    this.daily = {
      breakfast: [],
      breakfastSnack: [],
      lunch: [],
      lunchSnack: [],
      dinner: [],
      dinnerSnack: []
    };
    this.totalFat = '0';
    this.dailyProtein = '0';
    this.dailyCarbs = '0';
    this.dailyCalories = 0;
    this.getDailyTotalNutrition().then(data => {
      this.daily = data;
      const macros = this.calculateMacros(data);
      this.dailyCalories = macros.calories;
      this.dailyProtein = macros.protein;
      this.totalFat = macros.fat;
      this.dailyCarbs = macros.carbs;
    });
  }

  calculateMacros(daily: IDaily) {
    let totalCalories = 0;
    let totalFat = 0;
    let totalProtein = 0;
    let totalCarbs = 0;

    daily.breakfast.forEach(meal => {
      totalCalories += meal.calories;
      totalFat += meal.fat.total.grams;
      totalProtein += meal.protein;
      totalCarbs += meal.totalCarbohydrates.grams;
    });
    daily.breakfastSnack.forEach(meal => {
      totalCalories += meal.calories;
      totalFat += meal.fat.total.grams;
      totalProtein += meal.protein;
      totalCarbs += meal.totalCarbohydrates.grams;
    });
    daily.lunch.forEach(meal => {
      totalCalories += meal.calories;
      totalFat += meal.fat.total.grams;
      totalProtein += meal.protein;
      totalCarbs += meal.totalCarbohydrates.grams;
    });
    daily.lunchSnack.forEach(meal => {
      totalCalories += meal.calories;
      totalFat += meal.fat.total.grams;
      totalProtein += meal.protein;
      totalCarbs += meal.totalCarbohydrates.grams;
    });
    daily.dinner.forEach(meal => {
      totalCalories += meal.calories;
      totalFat += meal.fat.total.grams;
      totalProtein += meal.protein;
      totalCarbs += meal.totalCarbohydrates.grams;
    });
    daily.dinnerSnack.forEach(meal => {
      totalCalories += meal.calories;
      totalFat += meal.fat.total.grams;
      totalProtein += meal.protein;
      totalCarbs += meal.totalCarbohydrates.grams;
    });
    totalFat = totalFat * 9 / totalCalories * 100;
    totalProtein = totalProtein * 4 / totalCalories * 100;
    totalCarbs = totalCarbs * 4 / totalCalories * 100;
    return {
      fat: totalFat.toFixed(0),
      protein: totalProtein.toFixed(0),
      carbs: totalCarbs.toFixed(0),
      calories: totalCalories
    }
  }

  getDailyTotalNutrition(): Promise<IDaily> {
    //TODO: When deleting the fake data and implementing the call
    // to the DB remember to DELETE any from return tyoe generic
    // <IDaily | any>
    return new Promise(resolve => {
      const daily = MOCKDAILY;

      resolve(daily);
    })
  };

  getPastDailyEntries() {
    return new Promise(resolve => {
      const entries = MOCKENTRIES; console.log(entries);
      resolve(entries);
    });
  }

  render() {
    return [
      <div>
        {navigator.userAgent.match('Mobile')
          ? <div></div>
          : <ion-header>
            <ion-toolbar color='primary'>
              <ion-buttons slot='end'>
                <ion-button href='.'>
                  <ion-icon slot='icon-only' name='add'></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
        }
      </div>,

      <ion-content class='ion-padding'>
        <h1>Today</h1>
        <h3>Calories consumed: {this.dailyCalories}</h3>

        <ion-list lines='none'>
          <ion-item-divider color='secondary'>
            <ion-label>MacroNutrients</ion-label>
          </ion-item-divider>
          <ion-item>
            <ion-label>Carbohydrates: {this.dailyCarbs}%</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Protein: {this.dailyProtein}%</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Fat: {this.totalFat}%</ion-label>
          </ion-item>
          <ion-item-divider color='tertiary'>
            <ion-label>Calories consumed at:</ion-label>
          </ion-item-divider>
          {this.daily.breakfast.length > 0
            ? <ion-list lines='none'>
              <ion-list-header>Breakfast: {this.breakfastTotalCalories}</ion-list-header>

              {this.daily.breakfast.map((meal: IMeal) =>
                <div>
                  <ion-item>
                    <ion-label class='ion-text-wrap'>Name: {meal.name}</ion-label>
                    <ion-label>Calories: {meal.calories}</ion-label>
                  </ion-item>
                </div>
              )}
            </ion-list>
            : <div></div>
          }

          {this.daily.breakfastSnack.length > 0
            ? <ion-list lines='none'>
              <ion-list-header>Breakfast Snack: {this.breakfastSnackTotalCalories}</ion-list-header>

              {this.daily.breakfastSnack.map((meal: IMeal) =>
                <div>
                  <ion-item>
                    <ion-label class='ion-text-wrap'>Name: {meal.name}</ion-label>
                    <ion-label>Calories: {meal.calories}</ion-label>
                  </ion-item>
                </div>
              )}
            </ion-list>
            : <div></div>
          }

          {this.daily.lunch.length > 0
            ? <ion-list lines='none'>
              <ion-list-header>Lunch: {this.lunchTotalCalories}</ion-list-header>

              {this.daily.lunch.map((meal: IMeal) =>
                <div>
                  <ion-item>
                    <ion-label class='ion-text-wrap'>Name: {meal.name}</ion-label>
                    <ion-label>Calories: {meal.calories}</ion-label>
                  </ion-item>
                </div>
              )}
            </ion-list>
            : <div></div>
          }

          {this.daily.lunchSnack.length > 0
            ? <ion-list lines='none'>
              <ion-list-header>Lunch Snack: {this.lunchSnackTotalCalories}</ion-list-header>

              {this.daily.lunchSnack.map((meal: IMeal) =>
                <div>
                  <ion-item>
                    <ion-label class='ion-text-wrap'>Name: {meal.name}</ion-label>
                    <ion-label>Calories: {meal.calories}</ion-label>
                  </ion-item>
                </div>
              )}
            </ion-list>
            : <div></div>
          }

          {this.daily.dinner.length > 0
            ? <ion-list lines='none'>
              <ion-list-header>Dinner: {this.dinnerTotalCalories}</ion-list-header>

              {this.daily.dinner.map((meal: IMeal) =>
                <div>
                  <ion-item>
                    <ion-label class='ion-text-wrap'>Name: {meal.name}</ion-label>
                    <ion-label>Calories: {meal.calories}</ion-label>
                  </ion-item>
                </div>
              )}
            </ion-list>
            : <div></div>
          }

          {this.daily.dinnerSnack.length > 0
            ? <ion-list lines='none'>
              <ion-list-header>Dinner Snack: {this.dinnerSnackTotalCalories}</ion-list-header>

              {this.daily.dinnerSnack.map((meal: IMeal) =>
                <div>
                  <ion-item>
                    <ion-label class='ion-text-wrap'>Name: {meal.name}</ion-label>
                    <ion-label>Calories: {meal.calories}</ion-label>
                  </ion-item>
                </div>
              )}
            </ion-list>
            : <div></div>
          }
        </ion-list>

      </ion-content>,

      <div>
        {navigator.userAgent.match('Mobile')
          ? <ion-footer>
            <ion-toolbar color='primary'>
              <ion-buttons slot='end'>
                <ion-button href='.'>
                  <ion-icon slot='icon-only' name='add'></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-footer>
          : <div></div>
        }
      </div>
    ]
  }
}
