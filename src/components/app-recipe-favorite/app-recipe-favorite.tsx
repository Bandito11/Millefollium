import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-recipe-favorite',
  styleUrl: 'app-recipe-favorite.css'
})
export class AppRecipeFavorite {
  getToolbar(footer?: boolean) {
    return <ion-toolbar color="primary">
      {
        footer ? "" : <ion-title>Favorite</ion-title>
      }
      <ion-buttons slot="start">
        <ion-back-button defaultHref="/recipe/list"></ion-back-button>
      </ion-buttons>
    </ion-toolbar>
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
        <ion-content class="ion-padding">

        </ion-content>
        <ion-footer>
          {
            navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android')
              ? this.getToolbar(true)
              : ''
          }
        </ion-footer>
      </Host>
    );
  }

}
