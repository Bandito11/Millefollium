import { Component, h } from '@stencil/core';
import { checkIfLoggedIn } from '../../services/auth.service';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/main" component="app-main" beforeLeave={isLoggedInGuard} beforeEnter={isLoggedInGuard} />
          <ion-route url="/main/edit" component="app-edit" beforeEnter={isLoggedInGuard} />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}

const isLoggedInGuard = async () => {
  const isLoggedIn = await checkIfLoggedIn();
  if (isLoggedIn) {
    return true;
  } else {
    return { redirect: '/' };
  }
}