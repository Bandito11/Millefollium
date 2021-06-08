import {
  Component,
  Host,
  h,
  State,
  Event,
  EventEmitter,
  Prop,
} from '@stencil/core';

@Component({
  tag: 'steps-inputs',
  styleUrl: 'steps-inputs.css',
})
export class StepsInputs {
  @State() inputs: HTMLElement[];
  @Prop() steps: string[];
  data: string[];

  componentWillLoad() {
    this.inputs = [];
    if (!this.steps) {
      this.inputs = [...this.inputs, this.addStepInput(0)];
      this.data = [null];
    } else {
      this.data = [...this.steps];
      this.data.map(
        (step, i) =>
          (this.inputs = [...this.inputs, this.addStepInput(i, step)])
      );
    }
  }

  @Event() stepsInputData: EventEmitter<string[]>;

  addStepInput(index, step?: string) {
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
    this.data[arg0.index] = arg0.event.target['value'];
    this.stepsInputData.emit(this.data);
  }
  addNewInput(index) {
    this.inputs = [...this.inputs, this.addStepInput(index)];
    this.data.push(null);
  }
  popInput(): void {
    this.inputs.pop();
    this.inputs = [...this.inputs];
    this.data.pop();
  }
  render() {
    return (
      <Host>
        <ion-list>
          <ion-list-header>
            <ion-label>Steps</ion-label>
          </ion-list-header>
          {this.inputs.map((stepsControl) => stepsControl)}
          <div class="ion-padding">
            <ion-button
              size="small"
              onClick={() => this.addNewInput(this.inputs.length)}
            >
              Add step
            </ion-button>
            <ion-button
              size="small"
              color="secondary"
              onClick={() => this.popInput()}
            >
              Remove step
            </ion-button>
          </div>
        </ion-list>
      </Host>
    );
  }
}
