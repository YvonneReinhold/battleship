import { Injectable } from '@angular/core';
import { Board } from '../models/Board';
import { Ship, Direction } from '../models/ships/Ship';
import { Field } from '../models/Field';
import { StatusImage } from '../models/StatusImage';
import { Carrier } from '../models/ships/Carrier';
import { Coordinate } from '../models/Coordinate';
import { Battleship } from '../models/ships/Battleship';
import { Destroyer } from '../models/ships/Destroyer';
import { Submarine } from '../models/ships/Submarine';
import { PatrolBoat } from '../models/ships/PatrolBoat';

const HEADER_HORIZONTAL = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

@Injectable({
  providedIn: 'root'
})
export class GameBoardService {

  private board: Board;
  private failedShots: number;

  constructor() {
  }

  getHorizontalHeader() {
    return HEADER_HORIZONTAL.slice(0, this.getWidth());
  }

  shoot(field: Field) {
    if (field.isShot) {
      // field already clicked -> do nothing
      return;
    }
    field.isShot = true;
    if (field.ship != null) {
      field.statusImage = StatusImage.SHIP;
      field.ship.hit();
      if (field.ship.isSunken()) {
        this.killShip(field.ship);
      }
    } else {
      this.failedShots++;
      field.statusImage = StatusImage.SEA_SHOT;
    }
  }

  getFailedShots(): number {
    return this.failedShots;
  }

  initializeBoard() {
    this.board = new Board(10, 10);
    this.failedShots = 0;
    // TODO: Randomize ship positions
    this.addShip(new Carrier(new Coordinate(2, 5), Direction.Right));
    this.addShip(new Battleship(new Coordinate(6, 3), Direction.Up));
    this.addShip(new Destroyer(new Coordinate(5, 8), Direction.Left));
    this.addShip(new Submarine(new Coordinate(1, 1), Direction.Down));
    this.addShip(new PatrolBoat(new Coordinate(0, 8), Direction.Down));
  }

  getWidth(): number {
    return this.board.fields[0].length;
  }

  getHeigth() {
    return this.board.fields.length;
  }

  getFields() {
    return this.board.fields;
  }

  private getFieldsAsFlattenArray() {
    return [].concat.apply([], this.board.fields);
  }

  private killShip(ship: Ship) {
    this.getFieldsAsFlattenArray().forEach((field: Field) => {
      if (field.ship === ship) {
        field.statusImage = StatusImage.SHIP_KILLED;
      }
    });
  }

  private addShip(ship: Ship) {
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

  private isValidPosition(ship: Ship): boolean {
    // TODO: Implement Me!
    return true;
  }

  private setShipAtPosition(column: number, row: number, ship: Ship) {
    this.board.fields[row][column].setShip(ship);
  }

}
