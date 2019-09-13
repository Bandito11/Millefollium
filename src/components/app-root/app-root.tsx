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
          <ion-route url="/food/list" component="app-food-list"></ion-route>
          <ion-route url="/food/create" component="app-form-food"></ion-route>
          <ion-route url="/food/edit" component="app-form-food"></ion-route>
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
