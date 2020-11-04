import { Component, h, Host, Listen, State } from "@stencil/core";
import { calculateMacros, dateToString, goToRecipeInfo } from "../../helpers/utils";
import { IDaily, IMeal } from "../../interfaces";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css"
})
export class AppHome {

  @State() daily: IDaily;
  @State() pastDailyEntries: IDaily[];
  dailyCalories;
  dailyFat;
  dailyProtein;
  dailyCarbs;
  pastDate: number;
  dates: number[];
  scrollTopMax: number;

  ionNavEvent() {
    document.querySelector('ion-nav').addEventListener('ionNavWillChange', () => {
      this.getDailyEntry(this.daily.date);
    });
  }

  componentWillLoad() {
    this.dailyCalories = 0;
    this.dailyCarbs = 0;
    this.dailyFat = 0;
    this.dailyProtein = 0;
    this.daily = {
      date: new Date().valueOf(),
      meals: []
    };
    this.pastDate = new Date().valueOf();
    this.pastDailyEntries = [];
    this.dates = [];
    this.getDailyEntry(this.daily.date);
    this.getPastDailyEntries();
  }

  async componentDidLoad() {
    this.ionNavEvent();

    const content = document.querySelector<HTMLIonContentElement>('#home-content');
    const scroll = await content.getScrollElement();
    this.scrollTopMax = scroll['scrollTopMax'];
  }

  @Listen('updatedDailyEntry')
  handleUpdatedDailyEntry() {
    // this.getDailyEntry();
    // this.refreshPastDailyEntries();
  }


  getDailyEntry(date: number) {
    //TODO: Get this data from local database
    const frenchToast: IMeal = {
      name: 'French Toast',
      ingredients: [],
      image: 'assets/images/frenchtoast.jpg',
      protein: 24,
      carbs: 12,
      steps: [],
      calories: 400,
      fat: 19,
      category: 'breakfast',
      ratings: 5
    }

    const chickenRice: IMeal = {
      name: 'Chicken with Rice & Spinach',
      ingredients: [],
      image: 'assets/images/chickenrice.jpg',
      protein: 30,
      carbs: 40,
      steps: [],
      calories: 600,
      fat: 10,
      category: 'dinner',
      ratings: 3
    }
    this.daily.meals = [chickenRice, frenchToast];
    /////////////////////
    date
    //TODO: Search by date getDailyData(date)
    //TODO: When creating the local database, the data has to be synced by category <snack, breakfast, lunch, dinner> in this order
    if (this.daily.meals.length > 0) {
      const macros = calculateMacros(this.daily.meals);
      this.dailyCalories = macros.dailyCalories;
      this.dailyCarbs = macros.dailyCarbs;
      this.dailyFat = macros.dailyFat;
      this.dailyProtein = macros.dailyProtein;
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

  refreshPastDailyEntries() {
    // const dates = this.pastDailyEntries.map(entry => new Date(entry.date));
    // const response = getDailyEntries(dates);
    // if (response.success) {
    //   this.pastDailyEntries = [...response.data];
    // } else {
    //   this.pastDailyEntries = [];
  }

  getPastDailyEntries() {
    //////?TODO: Get this information from database
    const frenchToast: IMeal = {
      name: 'French Toast',
      ingredients: [],
      image: 'assets/images/frenchtoast.jpg',
      protein: 24,
      carbs: 12,
      steps: [],
      calories: 400,
      fat: 19,
      category: 'breakfast',
      ratings: 5
    }

    const chickenRice: IMeal = {
      name: 'Chicken with Rice & Spinach',
      ingredients: [],
      image: 'assets/images/chickenrice.jpg',
      protein: 30,
      carbs: 40,
      steps: [],
      calories: 600,
      fat: 10,
      category: 'dinner',
      ratings: 3
    }
    const daily1 = {
      date: new Date('11/02/2020').valueOf(),
      meals: [chickenRice, frenchToast]
    };
    const daily2 = {
      date: new Date('11/01/2020').valueOf(),
      meals: [frenchToast]
    };

    const daily3 = {
      date: new Date('10/31/2020').valueOf(),
      meals: [chickenRice]
    };

    this.pastDailyEntries = [daily1, daily2, daily3];
    /////////
    for (let i = 0; i < 10; i++) {
      this.generatePastDate();
      //TODO: Query past daily entries by dates
      //TODO: GetPastDailyEntries(this.pastDate)
    };
  }

  getToolbar(footer?: boolean) {
    return <ion-toolbar color="primary">
      {
        footer ? "" : <ion-title>Food Tracker</ion-title>
      }
      <ion-button class="searchbutton" fill="clear" expand="full" href="/recipe/list">
        <ion-searchbar disabled={true}></ion-searchbar>
      </ion-button>
      <ion-buttons slot="end">
        <ion-button href="/user/profile">
          <ion-icon slot="icon-only" name="ellipsis-vertical-outline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  }

  async getDailyPastEntries(ev: CustomEvent<import("@ionic/core").ScrollDetail>) {
    if (ev.detail.isScrolling && (ev.detail.scrollTop == this.scrollTopMax)) {
      //TODO: Refresh when user have more than 10 daily entries
      // this.getPastDailyEntries();
      console.error('scroll in home...')
    }
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
          <img src="/assets/images/stick guy.png" />
          <h2>Today</h2>
          <h3>{this.dailyCalories} calories</h3>
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
                    // onClick={() => goToRecipeInfo(meal.name)}
                    name={meal.name}
                    calories={meal.calories}
                    image={meal.image}
                  >
                    <ion-button slot="buttons" fill="outline">
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
                    this.pastDailyEntries.map((daily, i) =>
                      <div>
                        {
                          i === 0
                            ? <div class="ion-text-end">
                              <h6>{calculateMacros(daily.meals).dailyCalories} calories Yesterday</h6>
                            </div>
                            : <div class="ion-text-end">
                              <h6>{calculateMacros(daily.meals).dailyCalories} calories in {dateToString(new Date(daily.date))}</h6>
                            </div>
                        }
                        {
                          daily.meals.map(meal =>
                            <app-recipe-daily
                              name={meal.name}
                              calories={meal.calories}
                              image={meal.image}
                            // onClick={() => goToRecipeInfo(meal.name)}
                            >
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
              ? this.getToolbar(true)
              : ''
          }
        </ion-footer>
      </Host>
    )
  }
}
