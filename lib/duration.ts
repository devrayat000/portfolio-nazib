export interface IDuration {
  hours: number;
  minutes: number;
  seconds: number;
}

export default class Duration implements IDuration {
  hours: number;
  minutes: number;
  seconds: number;

  constructor(input: Partial<IDuration>) {
    this.hours = input.hours ?? 0;
    this.minutes = input.minutes ?? 0;
    this.seconds = input.seconds ?? 0;

    this.#refactor();
  }

  #refactor() {
    let newHours = Math.floor(this.seconds / 3600);
    let newMinutes = Math.floor((this.seconds % 3600) / 60);
    let newSeconds = Math.floor((this.seconds % 3600) % 60);

    this.hours += newHours;
    this.minutes += newMinutes;
    this.seconds = newSeconds;

    if (this.minutes >= 60) {
      this.hours++;
      this.minutes -= 60;
    }
  }

  toJson() {
    return {
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
    };
  }
}
