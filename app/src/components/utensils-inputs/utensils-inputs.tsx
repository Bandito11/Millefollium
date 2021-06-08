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
  @State() inputs: HTMLElement[];
  @Prop() utensils: string[];
  data: string[];

  componentWillLoad() {
    this.inputs = [];
    if (!this.utensils) {
      this.inputs = [...this.inputs, this.addUtensilInput(0)];
      this.data = [null];
    } else {
      this.data = [...this.utensils];
      this.data.map(
        (utensil, i) =>
          (this.inputs = [...this.inputs, this.addUtensilInput(i, utensil)])
      );
    }
  }

  @Event() utensilInputData: EventEmitter<string[]>;

  addUtensilInput(index, utensil?: string) {
    return (
      <ion-item>
        <ion-label position="stacked">{index + 1}</ion-label>
        <ion-input
          id={index}
          required={true}
          value={utensil}
          onInput={(event) => this.handleInput({ index: index, event: event })}
        />
      </ion-item>
    );
  }
  handleInput(arg0: { index: any; event: Event }): void {
    this.data[arg0.index] = arg0.event.target['value'];
    this.utensilInputData.emit(this.data);
  }
  addToUtensilInputs(index) {
    this.inputs = [...this.inputs, this.addUtensilInput(index)];
    this.data.push(null);
  }
  removeFromUtensilInputs(): void {
    this.inputs.pop();
    this.inputs = [...this.inputs];
    this.data.pop();
  }
  render() {
    return (
      <Host>
        <ion-list>
          <ion-list-header>
            <ion-label>
              <h2>Utensils</h2>
            </ion-label>
          </ion-list-header>
          {this.inputs.map((utensilControl) => utensilControl)}
          <div class="ion-padding">
            <ion-button
              size="small"
              onClick={() => this.addToUtensilInputs(this.inputs.length)}
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
