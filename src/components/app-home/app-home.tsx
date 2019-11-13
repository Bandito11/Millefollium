import { Component, h, Listen, State } from "@stencil/core";
import { IDaily, IMeal } from "../../interfaces";
import { getDaily, getDailyEntries } from "../../services/db";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css"
})
export class AppHome {

  @State() daily: IDaily = {
    calories: '0',
    breakfast: [],
    breakfastSnack: [],
    lunch: [],
    lunchSnack: [],
    dinner: [],
    dinnerSnack: [],
    date: ''
  };
  @State() pastDailyEntries: IDaily[] = [];
  dailyCalories = 0;
  breakfastCalories = 0;
  breakfastSnackCalories = 0;
  lunchCalories = 0;
  lunchSnackCalories = 0;
  dinnerCalories = 0;
  dinnerSnackCalories = 0;
  dailyFat = '0';
  dailyProtein = '0';
  dailyCarbs = '0';
  pastDate = new Date();
  dates: Date[] = [];

  componentWillLoad() {
    this.getPastDailyEntries();
  }

  componentDidLoad() {
    const content = document.querySelector<HTMLIonContentElement>('#home-content');
    content.scrollEvents = true;
    content.addEventListener('ionScroll', async (ev) => {
      const scroll = await content.getScrollElement();
      const scrollTopMax = scroll['scrollTopMax'];
      if (ev['detail']['scrollTop'] === scrollTopMax) {
        this.getPastDailyEntries();
      };
    });
    
    document.querySelector('ion-nav').addEventListener('ionNavDidChange', () => {
      this.getDailyEntry();
    });
  }

  @Listen('updatedDailyEntry')
  handleUpdatedDailyEntry() {
    this.getDailyEntry();
    this.refreshPastDailyEntries();
  }

  // @Listen('ionScroll')
  // async handleIonScroll(ev) {
  //   const content = document.querySelector('ion-content');
  //   const scroll = await content.getScrollElement();
  //   const scrollTopMax = scroll['scrollTopMax'];
  //   if (ev['detail']['scrollTop'] === scrollTopMax) {
  //     this.getPastDailyEntries();
  //   };
  // };

  calculateMacros() {
    let totalCalories;
    let totalFat;
    let totalProtein;
    let totalCarbs;
    let breakfastTotalCalories;
    let breakfastSnackTotalCalories;
    let lunchTotalCalories;
    let lunchSnackTotalCalories;
    let dinnerTotalCalories;
    let dinnerSnackTotalCalories;

    const breakfast = this.totalMealMacros(this.daily.breakfast);
    breakfastTotalCalories = breakfast.calories;
    totalFat = breakfast.fat;
    totalProtein = breakfast.protein;
    totalCarbs = breakfast.carbs;

    const breakfastSnack = this.totalMealMacros(this.daily.breakfastSnack);
    breakfastSnackTotalCalories = breakfastSnack.calories;
    totalFat = breakfastSnack.fat;
    totalProtein = breakfastSnack.protein;
    totalCarbs = breakfastSnack.carbs;

    const lunch = this.totalMealMacros(this.daily.lunch);
    lunchTotalCalories = lunch.calories;
    totalFat = lunch.fat;
    totalProtein = lunch.protein;
    totalCarbs = lunch.carbs;

    const lunchSnack = this.totalMealMacros(this.daily.lunchSnack);
    lunchSnackTotalCalories = lunchSnack.calories;
    totalFat = lunchSnack.fat;
    totalProtein = lunchSnack.protein;
    totalCarbs = lunchSnack.carbs;

    const dinner = this.totalMealMacros(this.daily.dinner);
    dinnerTotalCalories = dinner.calories;
    totalFat = dinner.fat;
    totalProtein = dinner.protein;
    totalCarbs = dinner.carbs;

    const dinnerSnack = this.totalMealMacros(this.daily.dinnerSnack);
    dinnerSnackTotalCalories = dinnerSnack.calories;
    totalFat = dinnerSnack.fat;
    totalProtein = dinnerSnack.protein;
    totalCarbs = dinnerSnack.carbs;

    totalCalories = breakfastTotalCalories + breakfastSnackTotalCalories + lunchTotalCalories + this.lunchSnackCalories + dinnerTotalCalories + dinnerSnackTotalCalories;
    if (totalCalories > 0) {
      totalFat = ((totalFat * 9) / totalCalories) * 100;
      totalProtein = ((totalProtein * 4) / totalCalories) * 100;
      totalCarbs = ((totalCarbs * 4) / totalCalories) * 100;
    } else {
      totalFat = 0;
      totalProtein = 0;
      totalCarbs = 0;
    }
    this.dailyCalories = totalCalories;
    this.dailyProtein = totalProtein.toFixed(0);
    this.dailyFat = totalFat.toFixed(0);
    this.dailyCarbs = totalCarbs.toFixed(0);
    this.breakfastCalories = breakfastTotalCalories;
    this.breakfastSnackCalories = breakfastSnackTotalCalories;
    this.lunchCalories = lunchTotalCalories;
    this.lunchSnackCalories = lunchSnackTotalCalories;
    this.dinnerCalories = dinnerTotalCalories;
    this.dinnerSnackCalories = dinnerSnackTotalCalories;
  }

  totalMealMacros(meals: IMeal[]) {
    let totalCalories = 0;
    let totalFat = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    meals.forEach(meal => {
      totalCalories += parseInt(meal.calories);
      totalFat += parseInt(meal.fat.total.grams);
      totalProtein += parseInt(meal.protein.grams);
      totalCarbs += parseInt(meal.totalCarbohydrates.grams);
    });
    return {
      calories: totalCalories,
      fat: totalFat,
      protein: totalProtein,
      carbs: totalCarbs
    }
  }

  getDailyEntry() {
    const response = getDaily(new Date());
    if (response.success) {
      this.daily = response.data;
      this.calculateMacros();
    } else {
      this.daily = {
        calories: '0',
        breakfast: [],
        breakfastSnack: [],
        lunch: [],
        lunchSnack: [],
        dinner: [],
        dinnerSnack: [],
        date: ''
      };
      this.dailyCalories = 0;
      this.dailyCarbs = '0';
      this.dailyFat = '0';
      this.dailyProtein = '0';
    }
  };


  generatePastDate() {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const date = new Date(`${this.pastDate.getMonth() + 1}/${this.pastDate.getDate() - 1}/${this.pastDate.getFullYear()}`);
    if (isNaN(date.getDate())) {
      let month = 0;
      if (this.pastDate.getMonth() !== 0) {
        month = this.pastDate.getMonth();
      } else {
        month = 12;
      }
      const lastDayOfTheMonth = daysInMonth[month - 1];
      this.pastDate = new Date(`${month}/${lastDayOfTheMonth}/${this.pastDate.getFullYear()}`);
    } else {
      this.pastDate = date;
    }
  }

  refreshPastDailyEntries() {
    const dates = this.pastDailyEntries.map(entry => new Date(entry.date));
    const response = getDailyEntries(dates);
    if (response.success) {
      this.pastDailyEntries = [...response.data];
    } else {
      this.pastDailyEntries = [];
    }
  }

  getPastDailyEntries() {
    this.dates = [];
    for (let i = 0; i < 10; i++) {
      this.generatePastDate();
      this.dates.push(this.pastDate);
    };
    const response = getDailyEntries(this.dates);
    if (response.success) {
      this.pastDailyEntries = [...this.pastDailyEntries, ...response.data];
    } else {
      this.pastDailyEntries = [];
    }
  }

  goToList() {
    const ionNav = document.querySelector('ion-nav');
    ionNav.push('app-food-list');
  }

  render() {
    return [
      <ion-nav></ion-nav>,
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
      <ion-content id="home-content" class="ion-padding">
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
              <ion-label>{this.dailyFat}% fat</ion-label>
            </ion-item>
          </ion-item-group>
          <ion-item-group>
            <ion-item-divider color="tertiary">
              <ion-label>Calories consumed at:</ion-label>
            </ion-item-divider>
            <app-daily-list
              daily={this.daily}
              breakfast-calories={this.breakfastCalories}
              breakfast-snack-Calories={this.breakfastSnackCalories}
              lunch-calories={this.lunchCalories}
              lunch-snack-calories={this.lunchSnackCalories}
              dinner-calories={this.dinnerCalories}
              dinner-snack-calories={this.dinnerSnackCalories}
            >
            </app-daily-list>
          </ion-item-group>
          {this.pastDailyEntries.length > 0
            ? <ion-item-group>
              <ion-item-divider color="medium">
                <ion-label>This week:</ion-label>
              </ion-item-divider>
              {
                this.pastDailyEntries.map(daily =>
                  <div>
                    <div class="ion-text-end">
                      <h2>{daily.date}</h2>
                    </div>
                    <app-daily-list
                      daily={daily}
                      today={daily.date}
                      breakfast-calories={this.totalMealMacros(daily.breakfast).calories}
                      breakfast-snack-Calories={this.totalMealMacros(daily.breakfastSnack).calories}
                      lunch-calories={this.totalMealMacros(daily.lunch).calories}
                      lunch-snack-calories={this.totalMealMacros(daily.lunchSnack).calories}
                      dinner-calories={this.totalMealMacros(daily.dinner).calories}
                      dinner-snack-calories={this.totalMealMacros(daily.dinnerSnack).calories}
                    >
                    </app-daily-list>
                  </div>
                )
              }
            </ion-item-group>
            : ''
          }
        </ion-list>
      </ion-content>,
      <div>
        {
          navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
            ? <ion-footer>
              <ion-toolbar color="primary">
                <ion-buttons slot="end">
                  <ion-button onClick={this.goToList.bind(this)}>
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
