import { Component, h, Listen, State } from "@stencil/core";
import { IDaily, IMeal } from "../../interfaces";
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

    const breakfast = this.totalMealMacros(daily.breakfast);
    breakfastTotalCalories += breakfast.calories;
    totalFat += breakfast.fat;
    totalProtein += breakfast.protein;
    totalCarbs += breakfast.carbs;

    const breakfastSnack = this.totalMealMacros(daily.breakfastSnack);
    breakfastSnackTotalCalories += breakfastSnack.calories;
    totalFat += breakfastSnack.fat;
    totalProtein += breakfastSnack.protein;
    totalCarbs += breakfastSnack.carbs;

    const lunch = this.totalMealMacros(daily.lunch);
    lunchTotalCalories += lunch.calories;
    totalFat += lunch.fat;
    totalProtein += lunch.protein;
    totalCarbs += lunch.carbs;

    const lunchSnack = this.totalMealMacros(daily.lunchSnack);
    lunchSnackTotalCalories += lunchSnack.calories;
    totalFat += lunchSnack.fat;
    totalProtein += lunchSnack.protein;
    totalCarbs += lunchSnack.carbs;

    const dinner = this.totalMealMacros(daily.dinner);
    dinnerTotalCalories += dinner.calories;
    totalFat += dinner.fat;
    totalProtein += dinner.protein;
    totalCarbs += dinner.carbs;

    const dinnerSnack = this.totalMealMacros(daily.dinnerSnack);
    dinnerSnackTotalCalories += dinnerSnack.calories;
    totalFat += dinnerSnack.fat;
    totalProtein += dinnerSnack.protein;
    totalCarbs += dinnerSnack.carbs;

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

  totalMealMacros(meals: IMeal[]) {
    let totalCalories = 0;
    let totalFat = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    meals.forEach(meal => {
      totalCalories += meal.calories;
      totalFat += meal.fat.total.grams;
      totalProtein += meal.protein;
      totalCarbs += meal.totalCarbohydrates.grams;
    });
    return {
      calories: totalCalories,
      fat: totalFat,
      protein: totalProtein,
      carbs: totalCarbs
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

  goToList() {
    const ionNav = document.querySelector('ion-nav');
    // if(navigator.userAgent.toLowerCase().match('iphone') || navigator.userAgent.toLowerCase().match('ipad')){
    //   ionNav.animated = false;
    // }
    ionNav.push('app-food-list');
  }

  render() {
    return [

      <ion-nav></ion-nav>,
      <ion-loading-controller></ion-loading-controller>,
      <div>
        {
          navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
            ? ''
            : <ion-header>
              <ion-toolbar color="primary">
                <ion-buttons slot="end">
                  <ion-button href="/food/list">
                    <ion-icon slot="icon-only" name="add"></ion-icon>
                  </ion-button>
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
        }
      </div>,
      <ion-content class="ion-padding">
        <h1>Today</h1>
        <h3>{this.dailyCalories} calories consumed</h3>

        <ion-list lines="none">
          <ion-item-group>
            <ion-item-divider color="secondary">
              <ion-label>MacroNutrients</ion-label>
            </ion-item-divider>
            <ion-item>
              <ion-label>{this.dailyCarbs}% carbs</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>{this.dailyProtein}% protein</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>{this.totalFat}% fat</ion-label>
            </ion-item>
          </ion-item-group>
          <ion-item-group>
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
          </ion-item-group>
          <ion-item-group>
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
                    breakfast-calories={this.totalMealMacros(daily.breakfast).calories}
                    breakfast-snack-Calories={this.totalMealMacros(daily.breakfastSnack).calories}
                    lunch-calories={this.totalMealMacros(daily.lunch).calories}
                    lunch-snack-calories={this.totalMealMacros(daily.lunchSnack).calories}
                    dinner-calories={this.totalMealMacros(daily.dinner).calories}
                    dinner-snack-calories={this.totalMealMacros(daily.dinnerSnack).calories}
                  >
                  </app-daily>
                </div>
              )
            }
          </ion-item-group>
        </ion-list>
      </ion-content>,
      <div>
        {
          navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
            ? <ion-footer>
              <ion-toolbar color="primary">
                <ion-buttons slot="end">
                  <ion-button href="." onClick={this.goToList.bind(this)}>
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
