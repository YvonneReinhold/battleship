import { Field } from './Field';
import { Ship, Direction } from './ships/Ship';

export class Board {
  fields: Field[][];

  constructor(length: number, height: number) {
    this.fields = [];
    for (let row = 0; row < height; row++) {
      this.fields[row] = [];
      for (let column = 0; column < length; column++) {
        this.fields[row][column] = new Field(column, row);
      }
    }
  }

  getLength() {
    return this.fields[0].length;
  }

  getHeigth() {
    return this.fields.length;
  }

  addShip(ship: Ship) {
    console.log('set ship: ', ship);
    if (!this.isValidPosition(ship)) {
      return;
    }
    // add ship to board
    let startRow: number;
    let endRow: number;
    let startColumn: number;
    let endColumn: number;

    switch (ship.direction) {
      case Direction.Up:
        startRow = ship.startCoordinate.y;
        endRow = ship.startCoordinate.y - ship.length;
        for ( let row = startRow; row > endRow; row-- ) {
          this.setShipAtPosition(ship.startCoordinate.x, row, ship);
        }
        break;
      case Direction.Down:
        startRow = ship.startCoordinate.y;
        endRow = ship.startCoordinate.y + ship.length;
        for ( let row = startRow; row < endRow; row++ ) {
          this.setShipAtPosition(ship.startCoordinate.x, row, ship);
        }
        break;
      case Direction.Right:
        startColumn = ship.startCoordinate.x;
        endColumn = ship.startCoordinate.x + ship.length;
        for ( let column = startColumn; column < endColumn; column++ ) {
          console.log('Set ', ship.getDescription());
          this.setShipAtPosition(column, ship.startCoordinate.y, ship);
        }
        break;
      case Direction.Left:
        startColumn = ship.startCoordinate.x;
        endColumn = ship.startCoordinate.x - ship.length;
        for ( let column = startColumn; column > endColumn; column-- ) {
          this.setShipAtPosition(column, ship.startCoordinate.y, ship);
        }
        break;
    }

  }

  isValidPosition(ship: Ship): boolean {
    // TODO: Implement Me!
    return true;
  }

  setShipAtPosition(column: number, row: number, ship: Ship) {
    this.fields[row][column].setShip(ship);
  }
}
