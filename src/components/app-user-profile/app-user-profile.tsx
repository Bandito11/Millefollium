import { convertHeightToFeetInches, convertHeightToInches } from '../../helpers/utils';
import { Component, Host, h, State } from '@stencil/core';
import { IProfile } from '../../interfaces';
import { toastController } from '@ionic/core';
import { getProfile, insertUpdateProfile } from '../../services/user.profile.service';

@Component({
  tag: 'app-user-profile',
  styleUrl: 'app-user-profile.css'
})
export class AppUserProfile {
  @State() editParameters: boolean;
  @State() profile: IProfile;
  heightInFeet: number;
  heightInInches: number;
  @State() activityLevelChecked: boolean;

  async componentWillLoad() {
    try {
      const result = await getProfile();
      this.profile = result;
    } catch (error) {
      this.profile = {
        gender: 'male',
        age: 0,
        weight: 0,
        height: 0,
        neck: 0,
        waist: 0,
        activityLevel: ''
      };
    }
    const convertedHeight = convertHeightToFeetInches(this.profile.height);
    this.heightInFeet = convertedHeight.heightFeet;
    this.heightInInches = convertedHeight.heightInches;
  }

  async getProfile() {
    try {
      const result = await getProfile();
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async choseProfile() {
    this.editParameters = false;
    const heightInches = convertHeightToInches({ height: this.heightInFeet, width: this.heightInInches })
    this.profile.height = heightInches;
    try {
      const result = await insertUpdateProfile(this.profile);
      if (result) {
        const toast = await toastController.create({
          message: `Profile was updated!`,
          duration: 1000
        });
        toast.present();
      }
    } catch (error) {
      console.error(error);
    }
  }
  editProfile(): void {
    this.editParameters = true;
  }
  getToolbar(footer?: boolean) {
    return <ion-toolbar color="primary">
      {
        footer ? '' : <ion-title>User Profile</ion-title>
      }
      <ion-buttons slot="start">
        <ion-back-button defaultHref="/"></ion-back-button>
      </ion-buttons>
      <ion-buttons slot="end">
        {
          this.editParameters
            ? <ion-button fill="clear" onClick={() => this.choseProfile()}>
              <ion-icon slot="icon-only" name="checkmark-outline"></ion-icon>
            </ion-button>
            : <ion-button fill="clear" onClick={() => this.editProfile()}>
              <ion-icon slot="icon-only" name="create-outline"></ion-icon>
            </ion-button>
        }
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
          <ion-list lines="inset">
            {
              this.editParameters
                ? <ion-item>
                  <ion-label>Gender</ion-label>
                  <ion-select placeholder="Male" onIonChange={ev => this.profile.gender = ev.detail.value}>
                    <ion-select-option value="male">Male</ion-select-option>
                    <ion-select-option value="female">Female</ion-select-option>
                  </ion-select>
                </ion-item>
                : <ion-item lines="none">
                  <ion-label class="ion-text-capitalize">Gender: {this.profile.gender}</ion-label>
                </ion-item>
            }

            {
              this.editParameters
                ? <ion-item>
                  <ion-label position="stacked">Age</ion-label>
                  <ion-input inputMode="numeric" value={this.profile.age} type="text" onIonInput={ev => this.profile.age = parseInt(ev.target['value'])}></ion-input>
                </ion-item>
                : <ion-item lines="none">
                  <ion-label>Age: {this.profile.age}</ion-label>
                </ion-item>
            }

            {
              this.editParameters
                ? <ion-item>
                  <ion-label position="stacked">Weight (lbs)</ion-label>
                  <ion-input inputMode="numeric" value={this.profile.weight} type="text" onIonInput={ev => this.profile.weight = parseInt(ev.target['value'])}></ion-input>
                </ion-item>
                : <ion-item lines="none">
                  <ion-label>Weight: {this.profile.weight} lbs</ion-label>
                </ion-item>
            }
            {
              this.editParameters
                ? <div id="height-us-measurements">
                  <ion-item>
                    <ion-label position="stacked">Height (ft)</ion-label>
                    <ion-input inputMode="numeric" value={this.heightInFeet} type="text" onIonInput={ev => this.heightInFeet = parseInt(ev.target['value'])}></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="stacked">Height (in)</ion-label>
                    <ion-input inputMode="numeric" value={this.heightInInches} type="text" onIonInput={ev => this.heightInInches = parseInt(ev.target['value'])}></ion-input>
                  </ion-item>
                </div>
                : <ion-item lines="none">
                  <ion-label>Height: {this.heightInFeet} ft {this.heightInInches} in</ion-label>
                </ion-item>
            }

            {
              this.editParameters
                ? <ion-item>
                  <ion-label position="stacked">Neck (in)</ion-label>
                  <ion-input inputMode="numeric" value={this.profile.neck} type="text" onIonInput={ev => this.profile.neck = parseInt(ev.target['value'])}></ion-input>
                </ion-item>
                : <ion-item lines="none">
                  <ion-label>Neck: {this.profile.neck} in</ion-label>
                </ion-item>
            }

            {
              this.editParameters
                ? <ion-item>
                  <ion-label position="stacked">Waist (in)</ion-label>
                  <ion-input inputMode="numeric" value={this.profile.waist} type="text" onIonInput={ev => this.profile.waist = parseInt(ev.target['value'])}></ion-input>
                </ion-item>
                : <ion-item lines="none">
                  <ion-label>Waist: {this.profile.waist} in</ion-label>
                </ion-item>
            }

            {
              this.editParameters
                ?
                <ion-item>
                  <ion-label>Activity Level</ion-label>
                  <ion-select value={this.profile.activityLevel} placeholder="Select Activity Level" onIonChange={ev => this.profile.activityLevel = ev.detail.value}>
                    <ion-select-option value="sedentary">Sedentary</ion-select-option>
                    <ion-select-option value="moderately active">Moderately Active</ion-select-option>
                    <ion-select-option value="active">Active </ion-select-option>
                  </ion-select>
                </ion-item>
                :
                <ion-item lines="none">
                  <ion-label class="ion-text-capitalize">Activity Level: {this.profile.activityLevel}</ion-label>
                </ion-item>
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

}
