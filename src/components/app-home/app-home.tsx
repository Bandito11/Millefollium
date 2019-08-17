import { Component, h, State, Listen } from "@stencil/core";
import { IDaily } from "../../interfaces";
import { MOCKDAILY, MOCKENTRIES } from "../../helpers/mockData";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css"
})
export class AppHome {

  daily: IDaily = {
    breakfast: [],
    breakfastSnack: [],
    lunch: [],
    lunchSnack: [],
    dinner: [],
    dinnerSnack: []
  };
  @State() pastDailyEntries: IDaily[] = [];
  dailyCalories: number = 0;
  breakfastCalories: number = 0;
  breakfastSnackCalories: number = 0;
  lunchCalories: number = 0;
  lunchSnackCalories: number = 0;
  dinnerCalories: number = 0;
  dinnerSnackCalories: number = 0;
  totalFat: string = '0';
  dailyProtein: string = '0';
  dailyCarbs: string = '0';

  async componentWillLoad() {
    try {
      const data = await this.getDailyEntry();
      this.daily = data;
      const macros = this.calculateMacros(data);
      this.dailyCalories = macros.calories;
      this.dailyProtein = macros.protein;
      this.totalFat = macros.fat;
      this.dailyCarbs = macros.carbs;
      this.breakfastCalories = macros.breakfastCalories;
      this.breakfastSnackCalories = macros.breakfastSnackCalories;
      this.lunchCalories = macros.lunchCalories;
      this.lunchSnackCalories = macros.lunchSnackCalories;
      this.dinnerCalories = macros.dinnerTotalCalories;
      this.dinnerSnackCalories = macros.dinnerSnackCalories;

    } catch (error) {
      console.error(error);
    }
  }

  componentDidLoad() {
    const content = document.querySelector('ion-content');
    content.scrollEvents = true;
  }


  @Listen('ionScroll')
  async handleIonScroll(ev) {
    const content = document.querySelector('ion-content');
    const scroll = await content.getScrollElement();
    const scrollTopMax = scroll['scrollTopMax'];
    if (ev['detail']['scrollTop'] === scrollTopMax) {
      const loadingController = document.querySelector('ion-loading-controller');
      const loading = await loadingController.create({
        message: 'Fetching...'
      });

      await loading.present();
      this.getPastDailyEntries()
        .then(data => {
          this.pastDailyEntries = [...this.pastDailyEntries, ...data];
          loading.dismiss();
        })
        .catch(error => console.error(error));
    };
  };

  calculateMacros(daily: IDaily) {
    let totalCalories = 0;
    let totalFat = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let breakfastTotalCalories = 0;
    let breakfastSnackTotalCalories = 0;
    let lunchTotalCalories = 0;
    let lunchSnackTotalCalories = 0;
    let dinnerTotalCalories = 0;
    let dinnerSnackTotalCalories = 0;

    daily.breakfast.forEach(meal => {
      breakfastTotalCalories += meal.calories;
      totalFat += meal.fat.total.grams;
      totalProtein += meal.protein;
      totalCarbs += meal.totalCarbohydrates.grams;
    });
    daily.breakfastSnack.forEach(meal => {
      breakfastSnackTotalCalories += meal.calories;
      totalFat += meal.fat.total.grams;
      totalProtein += meal.protein;
      totalCarbs += meal.totalCarbohydrates.grams;
    });
    daily.lunch.forEach(meal => {
      lunchTotalCalories += meal.calories;
      totalFat += meal.fat.total.grams;
      totalProtein += meal.protein;
      totalCarbs += meal.totalCarbohydrates.grams;
    });
    daily.lunchSnack.forEach(meal => {
      lunchSnackTotalCalories += meal.calories;
      totalFat += meal.fat.total.grams;
      totalProtein += meal.protein;
      totalCarbs += meal.totalCarbohydrates.grams;
    });
    daily.dinner.forEach(meal => {
      dinnerTotalCalories += meal.calories;
      totalFat += meal.fat.total.grams;
      totalProtein += meal.protein;
      totalCarbs += meal.totalCarbohydrates.grams;
    });
    daily.dinnerSnack.forEach(meal => {
      dinnerSnackTotalCalories += meal.calories;
      totalFat += meal.fat.total.grams;
      totalProtein += meal.protein;
      totalCarbs += meal.totalCarbohydrates.grams;
    });
    totalCalories = breakfastTotalCalories + breakfastSnackTotalCalories + lunchTotalCalories + this.lunchSnackCalories + dinnerTotalCalories + dinnerSnackTotalCalories;
    totalFat = totalFat * 9 / totalCalories * 100;
    totalProtein = totalProtein * 4 / totalCalories * 100;
    totalCarbs = totalCarbs * 4 / totalCalories * 100;
    return {
      fat: totalFat.toFixed(0),
      protein: totalProtein.toFixed(0),
      carbs: totalCarbs.toFixed(0),
      calories: totalCalories,
      breakfastCalories: breakfastTotalCalories,
      breakfastSnackCalories: breakfastSnackTotalCalories,
      lunchCalories: lunchTotalCalories,
      lunchSnackCalories: lunchSnackTotalCalories,
      dinnerTotalCalories: dinnerTotalCalories,
      dinnerSnackCalories: dinnerSnackTotalCalories
    }
  }

  getDailyEntry(): Promise<IDaily> {
    return new Promise(resolve => {
      const daily = MOCKDAILY;

      resolve(daily);
    })
  };

  getPastDailyEntries(): Promise<IDaily[]> {
    return new Promise(resolve => {
      const entries = MOCKENTRIES;
      resolve(entries);
    });
  }

  render() {
    return [
      <div>
        <ion-loading-controller></ion-loading-controller>
        {navigator.userAgent.match('Mobile')
          ? ''
          : <ion-header>
            <ion-toolbar color="primary">
              <ion-buttons slot="end">
                <ion-button href=".">
                  <ion-icon slot="icon-only" name="add"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
        }
      </div>,

      <ion-content class="ion-padding">
        <h1>Today</h1>
        <h3>Calories consumed: {this.dailyCalories}</h3>

        <ion-list lines="none">
          <ion-item-divider color="secondary">
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
          <ion-item-divider color="tertiary">
            <ion-label>Calories consumed at:</ion-label>
          </ion-item-divider>
          <app-daily
            daily={this.daily}
            breakfast-calories={this.breakfastCalories}
            breakfast-snack-Calories={this.breakfastSnackCalories}
            lunch-calories={this.lunchCalories}
            lunch-snack-calories={this.lunchSnackCalories}
            dinner-calories={this.dinnerCalories}
            dinner-snack-calories={this.dinnerSnackCalories}
          >
          </app-daily>
          <ion-item-divider color="tertiary">
            <ion-label>This week:</ion-label>
          </ion-item-divider>
          {
            this.pastDailyEntries.map(daily =>
              <div>
                <div class="ion-text-end">
                  <h2>{`${daily.date.getDate()}-${daily.date.getMonth()}-${daily.date.getFullYear()}`}</h2>
                </div>
                <app-daily
                  daily={daily}
                // breakfast-calories={macros.breakfastCalories}
                // breakfast-snack-Calories={macros.breakfastSnackCalories}
                // lunch-calories={macros.lunchCalories}
                // lunch-snack-calories={macros.lunchSnackCalories}
                // dinner-calories={macros.dinnerTotalCalories}
                // dinner-snack-calories={macros.dinnerSnackCalories}
                >
                </app-daily>
              </div>
            )
          }
        </ion-list>
      </ion-content>,
      <div>
        {navigator.userAgent.match('Mobile')
          ? <ion-footer>
            <ion-toolbar color="primary">
              <ion-buttons slot="end">
                <ion-button href=".">
                  <ion-icon slot="icon-only" name="add"></ion-icon>
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
