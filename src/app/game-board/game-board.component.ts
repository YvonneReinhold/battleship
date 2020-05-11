import { Component, OnInit } from '@angular/core';
import { Board } from '../models/Board';
import { Field } from '../models/Field';
import { Carrier } from '../models/ships/Carrier';
import { Coordinate } from '../models/Coordinate';
import { Direction, Ship } from '../models/ships/Ship';
import { Battleship } from '../models/ships/Battleship';
import { Destroyer } from '../models/ships/Destroyer';
import { Submarine } from '../models/ships/Submarine';
import { PatrolBoat } from '../models/ships/PatrolBoat';
import { StatusImage } from '../models/StatusImage';

const HEADER_HORIZONTAL = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
const HEADER_VERTICAL = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  gameBoard: Board = new Board(10, 10);
  failedShots = 0;

  // TODO: Randomize ship positions
  carrier = new Carrier(new Coordinate(2, 5), Direction.Right);
  battleship = new Battleship(new Coordinate(6, 3), Direction.Up);
  destroyer = new Destroyer(new Coordinate(5, 8), Direction.Left);
  submarine = new Submarine(new Coordinate(1, 1), Direction.Down);
  patrolBoat = new PatrolBoat(new Coordinate(0, 8), Direction.Down);

  constructor() { }

  ngOnInit() {
    this.setShips();
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

  killShip(ship: Ship) {
    this.getFieldsAsFlattenArray().forEach((field: Field) => {
      if (field.ship === ship) {
        field.statusImage = StatusImage.SHIP_KILLED;
      }
    });
  }

  getFieldImage(field: Field): string {
    if ( field.isShot ) {
      return field.statusImage;
    }
    return StatusImage.SEA;
  }

  getFieldsAsFlattenArray() {
    return [].concat.apply([], this.gameBoard.fields);
  }

  getHorizontalHeader() {
    return HEADER_HORIZONTAL.slice(0, this.gameBoard.getLength());
  }

  setShips() {
    this.gameBoard.addShip(this.carrier);
    this.gameBoard.addShip(this.battleship);
    this.gameBoard.addShip(this.destroyer);
    this.gameBoard.addShip(this.submarine);
    this.gameBoard.addShip(this.patrolBoat);
  }
}
