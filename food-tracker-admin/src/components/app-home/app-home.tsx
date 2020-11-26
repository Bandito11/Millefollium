import { alertController, toastController } from '@ionic/core';
import { Component, h, Host } from '@stencil/core';
import { loginIntoAPI } from '../../services/auth.service';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  headerText: string;
  password: string;
  email: string;

  componentWillLoad() {
    this.headerText = 'Login';
  }

  async handleSubmit(ev: Event): Promise<void> {
    if (ev) {
      ev.preventDefault();
    }
    try {
      await loginIntoAPI({ email: this.email, password: this.password });
      const toast = await toastController.create({
        message: `User is logged in.`,
        duration: 500, 
        position: 'top'
      });
      toast.present();
      const router = document.querySelector('ion-router');
      router.push('/main/')
    } catch (error) {
      const alert = await alertController.create({
        header: 'Error',
        message: error
      });
      alert.present();
    }
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>{this.headerText}</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <form onSubmit={ev => this.handleSubmit(ev)}>
            <ion-list>
              <ion-item>
                <ion-label position="stacked">E-Mail</ion-label>
                <ion-input required={true} type="email" onInput={ev => this.email = ev.target['value']}></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Password</ion-label>
                <ion-input required={true} type="password" onInput={ev => this.password = ev.target['value']}></ion-input>
              </ion-item>
              <ion-button expand="block" type="submit">Submit</ion-button>
            </ion-list>
          </form>
        </ion-content>
      </Host>
    );
  }
}
