import { Field } from './Field';
import { Ship, Direction } from './ships/Ship';

export class Board {
  private fields: Field[][];
  private availableShots: number;
  private failedShots: number;

  constructor(width: number, height: number, availableShots: number) {
    this.fields = [];
    this.availableShots = availableShots;
    for (let row = 0; row < height; row++) {
      this.fields[row] = [];
      for (let column = 0; column < width; column++) {
        this.fields[row][column] = new Field(column, row);
      }
    }
    this.failedShots = 0;
  }

  getWidth(): number {
    // if (this.fields === null) {
    //   return null;
    // }
    return this.fields[0].length;
  }

  getHeigth() {
    return this.fields.length;
  }

  isGameFailed(): boolean {
    if (this.getShotsLeft() === 0 && !this.isAllShipsKilled()) {
      return true;
    }
    return false;
  }

  isGameOver(): boolean {
    if (this.isAllShipsKilled()) {
      console.log('Game is over! All ships destroyed! uwu');
      return true;
    }
    if (this.getShotsLeft() === 0) {
      console.log('Game is over! No shots left! uwu');
      return true;
    }
  }

  /**
   * Determines whether all ships are killed or not.
   * @returns true if all ships are killed, false otherwise.
   */
  private isAllShipsKilled(): boolean {
    let isGameOver = true;
    this.getFieldsAsFlattenArray().forEach((field: Field) => {
      console.log('Field: ', field);
      if (field.ship && !field.ship.isSunken()) {
        isGameOver = false;
        return;
      }
    });
    return isGameOver;
  }

  /**
   * Get the number of shots left.
   * @returns shots left
   */
  getShotsLeft(): number {
    return this.availableShots - this.failedShots;
  }

  /**
   * Get the number of failed shots for the current game.
   * @returns failed shots.
   */
  getFailedShots(): number {
    return this.failedShots;
  }

  /**
   * Get the number of available shots for the current game.
   * @returns available shots.
   */
  getAvailableShots(): number {
    return this.availableShots;
  }

  incrementFailedShots() {
    this.failedShots++;
  }

  getFields() {
    return this.fields;
  }

  /**
   * Gets all fields as an flatten array.
   * @returns fields as an array
   */
  getFieldsAsFlattenArray(): Field[] {
    return [].concat.apply([], this.fields);
  }

  /**
   * Add a ship to the game board. The ship object contains the position on the game board.
   *
   * @param ship Ship to add to the game board.
   */
  addShip(ship: Ship) {
    console.log('set ship: ', ship);
    // add ship to board
    let startRow: number;
    let endRow: number;
    let startColumn: number;
    let endColumn: number;

    switch (ship.direction) {
      case Direction.Down:
        startRow = ship.startCoordinate.y;
        endRow = ship.startCoordinate.y + ship.length;
        for ( let row = startRow; row < endRow; row++ ) {
          this.setShipAt(ship.startCoordinate.x, row, ship);
        }
        break;
      case Direction.Right:
        startColumn = ship.startCoordinate.x;
        endColumn = ship.startCoordinate.x + ship.length;
        for ( let column = startColumn; column < endColumn; column++ ) {
          console.log('Set ', ship.getDescription());
          this.setShipAt(column, ship.startCoordinate.y, ship);
        }
        break;
    }
  }

  private setShipAt(column: number, row: number, ship: Ship) {
    this.fields[row][column].setShip(ship);
  }
}
