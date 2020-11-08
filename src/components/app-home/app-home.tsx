import { toastController } from "@ionic/core";
import { Component, h, Host, State } from "@stencil/core";
import { calculateCalorieIntake, calculateMacros, dateToString, goToRecipeInfo, recommendedCaloriesPerActivityLevel } from "../../helpers/utils";
import { IDaily } from "../../interfaces";
import { getTodayDaily } from "../../services/daily.tracker.service";
import { removeMealFromLocalDaily } from "../../services/local.db";
import { getProfile } from "../../services/user.profile.service";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css"
})
export class AppHome {

  @State() daily: IDaily;
  @State() pastDailyEntries: IDaily[];
  @State() dailyCalories;
  @State() dailyFat;
  @State() dailyProtein;
  @State() dailyCarbs;
  today: number
  pastDate: number;
  dates: number[];
  scrollTopMax: number;
  interval: NodeJS.Timeout;
  @State() weighLoss: number;
  @State() recommendedCalories: number;

  ionNavEvent() {
    document.querySelector('ion-nav')
      .addEventListener('ionNavWillChange', () => {
        this.getDailyEntry(this.daily.date);
      });
  }

  async getDailyPastEntries(ev: CustomEvent<import("@ionic/core").ScrollDetail>) {
    const content = document.querySelector<HTMLIonContentElement>('#home-content');
    const scroll = await content.getScrollElement();
    this.scrollTopMax = scroll['scrollTopMax'];

    if ((ev.detail.currentY === this.scrollTopMax)) {
      this.getPastDailyEntries();
    }
  }
  componentWillLoad() {
    this.today = new Date().valueOf();
    this.recommendedCalories = 0;
    this.refreshDailyData({ date: this.today, meals: [] });
    this.pastDate = this.today;
    this.pastDailyEntries = [];
    this.dates = [];
    this.getDailyEntry(this.daily.date);
    this.getProfile();
  }

  async componentDidLoad() {
    this.ionNavEvent();
  }

  getToolbar() {
    return <ion-toolbar color="primary">
      <ion-searchbar onClick={() => this.goToRecipeList()}></ion-searchbar>
      <ion-buttons slot="end">
        <ion-button href="/user/profile">
          <ion-icon slot="icon-only" name="ellipsis-vertical-outline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  }

  async getProfile() {
    try {
      const profile = await getProfile();
      if (profile && profile.age > 0) {
        this.recommendedCalories = recommendedCaloriesPerActivityLevel({
          activityLevel: profile.activityLevel,
          age: profile.age,
          gender: profile.gender
        });
        if (this.recommendedCalories && this.dailyCalories) {
          this.weighLoss = this.recommendedCalories - this.dailyCalories;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getDailyEntry(date: number) {
    try {
      const result = getTodayDaily(date);
      if (result) {
        this.refreshDailyData(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  generatePastDate() {
    let pastDate = new Date(this.pastDate);
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const date = new Date(`${pastDate.getMonth() + 1}/${pastDate.getDate() - 1}/${pastDate.getFullYear()}`);
    if (isNaN(date.getDate())) {
      let month = 0;
      if (pastDate.getMonth() !== 0) {
        month = pastDate.getMonth();
      } else {
        month = 12;
      }
      const lastDayOfTheMonth = daysInMonth[month - 1];
      this.pastDate = new Date(`${month}/${lastDayOfTheMonth}/${pastDate.getFullYear()}`).valueOf();
    } else {
      this.pastDate = date.valueOf();
    }
  }

  async getPastDailyEntries() {
    //TODO: Query past daily entries by dates
    //TODO: GetPastDailyEntries(this.pastDate)
    //TODO: Limit it to per database not a FOR condition
    for (let i = 0; i < 10; i++) {
      this.generatePastDate();
      try {
        const result = await getTodayDaily(this.pastDate);
        if (result) {
          this.pastDailyEntries = [...this.pastDailyEntries, result];
        }
      } catch (error) {
        console.error(error);
      }
    };
  }

  goToRecipeList() {
    const router = document.querySelector('ion-router');
    if (router)
      router.push('/recipe/list', 'forward');
    return false;
  }

  async removeMeal({ meal, date }) {
    try {
      const data = removeMealFromLocalDaily({ meal: meal, date: date });
      if (data) {
        this.refreshDailyData(data);
        const toast = await toastController.create({
          message: `${meal.name} was successfully removed.`,
          color: 'success',
          duration: 1000
        });
        toast.present();
      } else {
        throw new Error(`Meal item was: ${data}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  refreshDailyData(data) {
    this.daily = {
      ...data
    }
    if (this.daily.meals.length > 0) {
      const macros = calculateMacros(this.daily.meals);
      this.dailyCalories = macros.calories;
      this.dailyCarbs = macros.carbs;
      this.dailyFat = macros.fat;
      this.dailyProtein = macros.protein;
    } else {
      this.dailyCalories = 0;
      this.dailyCarbs = 0;
      this.dailyFat = 0;
      this.dailyProtein = 0;
      this.weighLoss = 0;
    }
    this.weighLoss = calculateCalorieIntake({ recommendedCalories: this.recommendedCalories, dailyCalories: this.dailyCalories });
  }



  render() {
    return (
      <Host>
        <ion-header>
          {
            navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
              ? ''
              : this.getToolbar()
          }
        </ion-header>
        <ion-content scrollEvents={true} onIonScroll={(ev => this.getDailyPastEntries(ev))} id="home-content" class="ion-padding">
          <ion-img src="/assets/images/stick guy.png" ></ion-img>
          <h2>Today</h2>
          <h3>{this.dailyCalories} calories consumed</h3>
          {
            this.weighLoss > 0
              ?
              <div>
                <h4>Calories below maintenance</h4>
                <h6>{this.weighLoss} <ion-icon name="thumbs-up-outline"></ion-icon></h6>
              </div>
              :
              this.weighLoss < 0
                ?
                <div>
                  <h4>Calories above maintenance</h4>
                  <h6>{-1 * this.weighLoss} <ion-icon name="thumbs-down-outline"></ion-icon></h6>
                </div>
                :
                <div>
                  <h4>Calories on maintenance</h4>
                  <h6>{this.weighLoss} <ion-icon name="hand-left-outline"></ion-icon></h6>
                </div>
          }
          {
            this.recommendedCalories
              ? <div>
                <h4>Recommended Calories Intake</h4>
                <h6>{this.recommendedCalories}</h6>
              </div>
              : ''
          }
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
                <ion-label>Meals:</ion-label>
              </ion-item-divider>
              {
                this.daily.meals.map(meal =>
                  <app-recipe-daily
                    name={meal.name}
                    calories={meal.calories}
                    image={meal.image}
                  >
                    <ion-button slot="buttons" fill="outline" onClick={() => this.removeMeal({ meal: meal, date: this.today })}>
                      <ion-icon slot="icon-only" name="remove"></ion-icon>
                    </ion-button>
                    <ion-button slot="buttons" fill="outline" onClick={() => goToRecipeInfo(meal.name)}>
                      <ion-icon slot="icon-only" name="information-outline"></ion-icon>
                    </ion-button>
                  </app-recipe-daily>
                )
              }
            </ion-item-group>
            {
              this.pastDailyEntries.length > 0
                ? <ion-item-group>
                  <ion-item-divider color="medium">
                    <ion-label>This week:</ion-label>
                  </ion-item-divider>
                  {
                    this.pastDailyEntries.map((daily) =>
                      <div>
                        <div class="ion-text-end">
                          <h4>{calculateMacros(daily.meals).calories} calories in {dateToString(new Date(daily.date))}</h4>
                        </div>
                        {
                          daily.meals.map(meal =>
                            <app-recipe-daily
                              name={meal.name}
                              calories={meal.calories}
                              image={meal.image}
                            >
                              <ion-button slot="buttons" fill="outline" onClick={() => this.removeMeal({ meal: meal, date: daily.date })}>
                                <ion-icon slot="icon-only" name="remove"></ion-icon>
                              </ion-button>
                            </app-recipe-daily>
                          )
                        }
                      </div>
                    )
                  }
                </ion-item-group>
                : ''
            }
          </ion-list>
        </ion-content>
        <ion-footer>
          {
            navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
              ? this.getToolbar()
              : ''
          }
        </ion-footer>
      </Host>
    )
  }
}
