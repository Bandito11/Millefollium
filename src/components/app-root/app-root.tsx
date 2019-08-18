import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  componentWillLoad() {
    if (navigator.userAgent.toLowerCase().match('electron')) {
      const ionRouter = document.querySelector('ion-router');
      ionRouter.root = window.location.pathname
    }
  }
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/food-list" component="app-food-list"></ion-route>
          {/* <ion-route url="/profile/:name" component="app-profile" /> */}
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
