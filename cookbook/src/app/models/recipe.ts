import { Ingredient } from './ingredient';

export class Recipe {
  constructor(
    public id: number,
    public name: number,
    public ingredients: Ingredient[],
    public steps: string[],
    public timers: number[],
    public imageURL: string,
    public originalURL: string
  ) { }

  /**
   * duration
   *  calculates the duration from the timer values
   */
  get duration(): number {
    return this.timers.reduce((a, b) => a + b, 0);
  }
}
