import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-recipe-daily',
  styleUrl: 'app-recipe-daily.css'
})
export class AppRecipeDaily {
  @Prop() name: string;
  @Prop() calories: number;
  @Prop() image: string;

  async goToRecipeInfo(name: string) {
    const router = document.querySelector('ion-router');
    if (router) {
      return router.push(`/recipe/info/${name}`, 'forward');
    }
    return false;
  }
  render() {
    return (
      <Host>
        <ion-item onClick={() => this.goToRecipeInfo(this.name)}
        >
          <ion-thumbnail slot="start">
            <ion-img src={this.image} ></ion-img>
          </ion-thumbnail>
          <ion-label>
            {this.name}
            <br />
            {this.calories} calories
            </ion-label>
        </ion-item>
      </Host>
    );
  }

}
