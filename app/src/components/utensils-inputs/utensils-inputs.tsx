import {
  Component,
  Host,
  h,
  EventEmitter,
  Prop,
  State,
  Event,
} from '@stencil/core';

@Component({
  tag: 'utensils-inputs',
  styleUrl: 'utensils-inputs.css',
})
export class UtensilsInputs {
  @State() utensilInputs: HTMLElement[];
  @Prop() utensils: string[];

  componentWillLoad() {
    this.utensilInputs = [this.addUtensilInput(0)];
    if (!this.utensils) {
      this.utensils = [null];
    }
  }

  @Event() utensilInputData: EventEmitter<string[]>;

  addUtensilInput(index, step?: string) {
    return (
      <ion-item>
        <ion-label position="stacked">{index + 1}</ion-label>
        <ion-input
          id={index}
          required={true}
          value={step}
          onInput={(event) => this.handleInput({ index: index, event: event })}
        />
      </ion-item>
    );
  }
  handleInput(arg0: { index: any; event: Event }): void {
    this.utensils[arg0.index] = arg0.event.target['value'];
    this.utensilInputData.emit(this.utensils);
  }
  addToUtensilInputs(index) {
    this.utensilInputs = [...this.utensilInputs, this.addUtensilInput(index)];
    this.utensils.push(null);
  }
  removeFromUtensilInputs(): void {
    this.utensilInputs.pop();
    this.utensilInputs = [...this.utensilInputs];
    this.utensils.pop();
  }
  render() {
    return (
      <Host>
        <ion-list>
          <ion-list-header>
            <ion-label>Utensils</ion-label>
          </ion-list-header>
          {this.utensilInputs.map((utensilControl) => utensilControl)}
          <div class="ion-padding">
            <ion-button
              size="small"
              onClick={() => this.addToUtensilInputs(this.utensilInputs.length)}
            >
              Add utensil
            </ion-button>
            <ion-button
              size="small"
              color="secondary"
              onClick={() => this.removeFromUtensilInputs()}
            >
              Remove utensil
            </ion-button>
          </div>
        </ion-list>
      </Host>
    );
  }
}
