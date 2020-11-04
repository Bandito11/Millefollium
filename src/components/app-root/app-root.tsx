import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          {/* <ion-route url="/food/list" component="app-food-list"></ion-route> */}
          <ion-route url="/recipe/info/:name" component="app-recipe-info"></ion-route>
          <ion-route url="/recipe/list" component="app-recipe-list"></ion-route>
          <ion-route url="/user/profile" component="app-user-profile"></ion-route>
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
