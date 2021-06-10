import { Component, Host, h, State } from '@stencil/core';
import { toastController } from '@ionic/core';
import { getProfile, createUpdateProfile } from '../../services/user-profile';
import { IProfile } from '../../interfaces/IProfile';
import {
  convertHeightToFeetInches,
  convertHeightToInches,
  calculateBMI,
  calculateBodyFat,
} from '../../helpers/calculations';

@Component({
  tag: 'app-user-profile',
  styleUrl: 'app-user-profile.css',
})
export class AppUserProfile {
  @State() editParameters: boolean;
  @State() profile: IProfile;
  heightInFeet: number;
  heightInInches: number;
  @State() activityLevelChecked: boolean;

  componentWillLoad() {
    try {
      this.profile = getProfile();
    } catch (error) {
      this.profile = {
        gender: 'male',
        age: 0,
        weight: 0,
        height: 0,
        neck: 0,
        waist: 0,
        activityLevel: '',
        bodyFat: 0,
        bodyMassIndex: 0,
      };
    }
    const convertedHeight = convertHeightToFeetInches(this.profile.height);
    this.heightInFeet = convertedHeight.heightFeet;
    this.heightInInches = convertedHeight.heightInches;
  }

  getProfile() {
    try {
      const result = getProfile();
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async choseProfile() {
    this.editParameters = false;
    const heightInches = convertHeightToInches({
      height: this.heightInFeet,
      width: this.heightInInches,
    });
    this.profile.height = heightInches;
    this.profile.bodyMassIndex = calculateBMI(this.profile);
    this.profile.bodyFat = calculateBodyFat(this.profile);
    try {
      const result = createUpdateProfile(this.profile);
      if (result) {
        const toast = await toastController.create({
          message: `Profile was updated!`,
          duration: 1000,
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
  handleInput = (arg0: { control: string; event: Event }) => {
    let value;
    switch (arg0.control) {
      case 'gender':
        value = arg0.event['detail']['value'];
        this.profile.gender = value;
        break;
      case 'age':
        value = parseInt(arg0.event.target['value']);
        if (value) {
          this.profile.age = value;
        } else {
          this.profile.age = 0;
        }
        break;
      case 'weight':
        value = parseInt(arg0.event.target['value']);
        if (value) {
          this.profile.weight = value;
        } else {
          this.profile.weight = 0;
        }
        break;
      case 'height':
        value = parseInt(arg0.event.target['value']);
        if (value) {
          this.profile.height = value;
        } else {
          this.profile.height = 0;
        }
        break;
      case 'neck':
        value = parseInt(arg0.event.target['value']);
        if (value) {
          this.profile.neck = value;
        } else {
          this.profile.neck = 0;
        }
        break;
      case 'waist':
        value = parseInt(arg0.event.target['value']);
        if (value) {
          this.profile.waist = value;
        } else {
          this.profile.waist = 0;
        }
        break;
      case 'activity-level':
        value = arg0.event['detail']['value'];
        this.profile.activityLevel = value;
        break;
    }
  };
  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>User Profile</ion-title>
            <ion-buttons slot="start">
              <ion-back-button defaultHref="/"></ion-back-button>
            </ion-buttons>
            <ion-buttons slot="end">
              {this.editParameters ? (
                <ion-button fill="clear" onClick={() => this.choseProfile()}>
                  <ion-icon
                    slot="icon-only"
                    name="checkmark-outline"
                  ></ion-icon>
                </ion-button>
              ) : (
                <ion-button fill="clear" onClick={() => this.editProfile()}>
                  <ion-icon slot="icon-only" name="create-outline"></ion-icon>
                </ion-button>
              )}
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-list lines="inset">
            {this.editParameters ? (
              <ion-item>
                <ion-label>Gender</ion-label>
                <ion-select
                  placeholder="Male"
                  onIonChange={(event) =>
                    this.handleInput({ control: 'gender', event })
                  }
                >
                  <ion-select-option value="male">Male</ion-select-option>
                  <ion-select-option value="female">Female</ion-select-option>
                </ion-select>
              </ion-item>
            ) : (
              <ion-item lines="none">
                <ion-label class="ion-text-capitalize">
                  Gender: {this.profile.gender}
                </ion-label>
              </ion-item>
            )}

            {this.editParameters ? (
              <ion-item>
                <ion-label position="stacked">Age</ion-label>
                <ion-input
                  inputMode="numeric"
                  value={this.profile.age}
                  type="text"
                  onIonInput={(event) =>
                    this.handleInput({ control: 'age', event })
                  }
                ></ion-input>
              </ion-item>
            ) : (
              <ion-item lines="none">
                <ion-label>Age: {this.profile.age}</ion-label>
              </ion-item>
            )}

            {this.editParameters ? (
              <ion-item>
                <ion-label position="stacked">Weight (lbs)</ion-label>
                <ion-input
                  inputMode="numeric"
                  value={this.profile.weight}
                  type="text"
                  onIonInput={(ev) =>
                    (this.profile.weight = parseInt(ev.target['value']))
                  }
                ></ion-input>
              </ion-item>
            ) : (
              <ion-item lines="none">
                <ion-label>Weight: {this.profile.weight} lbs</ion-label>
              </ion-item>
            )}
            {this.editParameters ? (
              <div id="height-us-measurements">
                <ion-item>
                  <ion-label position="stacked">Height (ft)</ion-label>
                  <ion-input
                    inputMode="numeric"
                    value={this.heightInFeet}
                    type="text"
                    onIonInput={(ev) =>
                      (this.heightInFeet = parseInt(ev.target['value']))
                    }
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="stacked">Height (in)</ion-label>
                  <ion-input
                    inputMode="numeric"
                    value={this.heightInInches}
                    type="text"
                    onIonInput={(ev) =>
                      (this.heightInInches = parseInt(ev.target['value']))
                    }
                  ></ion-input>
                </ion-item>
              </div>
            ) : (
              <ion-item lines="none">
                <ion-label>
                  Height: {this.heightInFeet} ft {this.heightInInches} in
                </ion-label>
              </ion-item>
            )}

            {this.editParameters ? (
              <ion-item>
                <ion-label position="stacked">Neck (in)</ion-label>
                <ion-input
                  inputMode="numeric"
                  value={this.profile.neck}
                  type="text"
                  onIonInput={(ev) =>
                    (this.profile.neck = parseInt(ev.target['value']))
                  }
                ></ion-input>
              </ion-item>
            ) : (
              <ion-item lines="none">
                <ion-label>Neck: {this.profile.neck} in</ion-label>
              </ion-item>
            )}

            {this.editParameters ? (
              <ion-item>
                <ion-label position="stacked">Waist (in)</ion-label>
                <ion-input
                  inputMode="numeric"
                  value={this.profile.waist}
                  type="text"
                  onIonInput={(ev) =>
                    (this.profile.waist = parseInt(ev.target['value']))
                  }
                ></ion-input>
              </ion-item>
            ) : (
              <ion-item lines="none">
                <ion-label>Waist: {this.profile.waist} in</ion-label>
              </ion-item>
            )}

            {this.editParameters ? (
              <ion-item>
                <ion-label>Activity Level</ion-label>
                <ion-select
                  value={this.profile.activityLevel}
                  placeholder="Select Activity Level"
                  onIonChange={(event) =>
                    this.handleInput({ control: 'activity-level', event })
                  }
                >
                  <ion-select-option value="sedentary">
                    Sedentary
                  </ion-select-option>
                  <ion-select-option value="moderately active">
                    Moderately Active
                  </ion-select-option>
                  <ion-select-option value="active">Active </ion-select-option>
                </ion-select>
              </ion-item>
            ) : (
              <ion-item lines="none">
                <ion-label class="ion-text-capitalize">
                  Activity Level: {this.profile.activityLevel}
                </ion-label>
              </ion-item>
            )}
            {this.editParameters ? (
              ''
            ) : (
              <ion-item lines="none">
                <ion-label>
                  BMI: {this.profile.bodyMassIndex.toFixed(1)}
                </ion-label>
              </ion-item>
            )}
            {this.editParameters ? (
              ''
            ) : (
              <ion-item lines="none">
                <ion-label>
                  Body Fat: {this.profile.bodyFat.toFixed(0)}%
                </ion-label>
              </ion-item>
            )}
          </ion-list>
        </ion-content>
      </Host>
    );
  }
}
