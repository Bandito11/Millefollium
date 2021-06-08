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
  @State() stepsInputs: HTMLElement[];
  @Prop() steps: string[];

  componentWillLoad() {
    this.stepsInputs = [this.addStepInput(0)];
    if (!this.steps) {
      this.steps = [null];
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
    this.steps[arg0.index] = arg0.event.target['value'];
    this.stepsInputData.emit(this.steps);
  }
  addToStepsInputs(index) {
    this.stepsInputs = [...this.stepsInputs, this.addStepInput(index)];
    this.steps.push(null);
  }
  removeFromStepsInputs(): void {
    this.stepsInputs.pop();
    this.stepsInputs = [...this.stepsInputs];
    this.steps.pop();
  }
  render() {
    return (
      <Host>
        <ion-list>
          <ion-list-header>
            <ion-label>Steps</ion-label>
          </ion-list-header>
          {this.stepsInputs.map(stepsControl => stepsControl)}
          <div class="ion-padding">
            <ion-button
              size="small"
              onClick={() => this.addToStepsInputs(this.stepsInputs.length)}
            >
              Add step
            </ion-button>
            <ion-button
              size="small"
              color="secondary"
              onClick={() => this.removeFromStepsInputs()}
            >
              Remove step
            </ion-button>
          </div>
        </ion-list>
      </Host>
    );
  }
}
