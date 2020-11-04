import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-recipe-list',
  styleUrl: 'app-recipe-list.css',
})
export class AppRecipeList {

  scrollEvent() {
    const content = document.querySelector<HTMLIonContentElement>('#food-list-content');
    content.scrollEvents = true;
    content.addEventListener('ionScroll', async (ev) => {
      const scroll = await content.getScrollElement();
      const scrollTopMax = scroll['scrollTopMax'];
      if (ev['detail']['scrollTop'] === scrollTopMax) {
        console.error('scroll in food list....')
      };
    });
  }

  componentDidLoad() {
    this.scrollEvent();
  }

  getToolbar() {
    return <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-back-button defaultHref="/"></ion-back-button>
      </ion-buttons>
      <ion-searchbar onIonChange={ev => this.searchRecipe(ev)} inputmode="text" type="search" debounce={500} spellcheck={true} autocomplete="on"></ion-searchbar>
      <ion-buttons slot="end">
        <ion-button>
          <ion-icon name="add-outline"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  }
  searchRecipe(ev: CustomEvent<import("@ionic/core").SearchbarChangeEventDetail>): void {
    const query = ev.detail.value;
    if (query) {
      console.error('Search Term ', query)
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
        <ion-content id="food-list-content" class="ion-padding">
          {
            // this.foodProducts.map((foodItem, index) =>
            //   <ion-card onClick={_ => this.showSelectionWindow(foodItem)}>
            //     {
            //       index % 2
            //         ? <ion-card-header color="secondary">
            //           <ion-label>{toUpperCase(foodItem.name)} </ion-label>
            //         </ion-card-header>
            //         : <ion-card-header color="tertiary">
            //           <ion-label>{toUpperCase(foodItem.name)} </ion-label>
            //         </ion-card-header>
            //     }
            //     <ion-item lines="none">
            //       <ion-label>
            //         Serving Size {foodItem.servingSize.size} {foodItem.servingSize.measurement}
            //       </ion-label>
            //     </ion-item>
            //     <ion-item lines="none">
            //       <ion-label>Servings per Container about {foodItem.servingPerContainer}</ion-label>
            //     </ion-item>
            //     <ion-item lines="none">
            //       <ion-label>{foodItem.calories} calories</ion-label>
            //     </ion-item>
            //   </ion-card>
            // )
          }
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
