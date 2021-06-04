import { Component, h } from '@stencil/core';
import { initLocalDB } from '../database/loki-db';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {

  componentWillLoad() {
    initLocalDB();
  }
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-recipe-list" />
          <ion-route url="/recipe/:name" component="app-recipe-info"></ion-route>
          <ion-route url="/home" component="app-home"></ion-route>
          <ion-route url="/user/profile" component="app-user-profile"></ion-route>
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
