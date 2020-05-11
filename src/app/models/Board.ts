import { Field } from './Field';
import { Ship, Direction } from './ships/Ship';

export class Board {
  fields: Field[][];

  constructor(width: number, height: number) {
    this.fields = [];
    for (let row = 0; row < height; row++) {
      this.fields[row] = [];
      for (let column = 0; column < width; column++) {
        this.fields[row][column] = new Field(column, row);
      }
    }
  }
}
