import { Component, Host, h, State } from '@stencil/core';
import { firstLetterToUpperCase } from '../../helpers/utils';

@Component({
  tag: 'app-user-profile',
  styleUrl: 'app-user-profile.css'
})
export class AppUserProfile {
  @State() editParameters: boolean;
  @State() profile;
  weighLoss: string | number;
  @State() weighLossChecked: any;

  componentWillLoad() {
    this.profile = {
      gender: 'male',
      age: 34,
      weight: 195,
      height: 72,
      neck: 15,
      waist: 34,
      weighLoss: 180
    }
    this.weighLoss = 20;
  }
  getToolbar(footer?: boolean) {
    return <ion-toolbar color="primary">
      {
        footer ? "" : <ion-title>User Profile</ion-title>
      }
      <ion-buttons slot="start">
        <ion-back-button defaultHref="/"></ion-back-button>
      </ion-buttons>
      <ion-buttons slot="end">
        {
          this.editParameters
            ? <ion-button fill="clear" onClick={() => this.choseGender()}>
              <ion-icon slot="icon-only" name="checkmark-outline"></ion-icon>
            </ion-button>
            : <ion-button fill="clear" onClick={() => this.editGender()}>
              <ion-icon slot="icon-only" name="create-outline"></ion-icon>
            </ion-button>
        }
        <ion-button>
          <ion-icon name="add-outline"></ion-icon>
        </ion-button>
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
          <ion-list lines="none">
            {
              this.editParameters
                ? <ion-item>
                  <ion-label>Gender</ion-label>
                  <ion-select placeholder="Male" onIonChange={ev => this.profile.gender = ev.detail.value}>
                    <ion-select-option value="male">Male</ion-select-option>
                    <ion-select-option value="female">Female</ion-select-option>
                  </ion-select>
                </ion-item>
                : <ion-label>Gender: {firstLetterToUpperCase(this.profile.gender)}</ion-label>
            }
            
            <ion-item>
              <ion-label>Age: 34</ion-label>
            </ion-item>

            <ion-item>
              <ion-label>Weight: 195 lbs</ion-label>
            </ion-item>

            <ion-item>
              <ion-label>Height: 5 ft 11 in</ion-label>
            </ion-item>

            <ion-item>
              <ion-label>Neck: 15 in</ion-label>
            </ion-item>

            <ion-item>
              <ion-label>Waist: 34 in</ion-label>
            </ion-item>

            <ion-item>
              <ion-label>Want to lose weight?</ion-label>
              <ion-checkbox slot="start" onIonChange={ev => this.weighLossChecked = ev.detail.value}></ion-checkbox>
            </ion-item>
            {
              this.weighLossChecked
                ? <ion-input type="text" value={this.weighLoss} onIonChange={ev => this.weighLoss = ev.detail.value}></ion-input>
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
    );
  }
  choseGender(): void {
    this.editParameters = false
  }
  editGender(): void {
    this.editParameters = true;
  }

}
