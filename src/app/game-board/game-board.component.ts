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

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  gameBoard: Board = new Board(8, 10);
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

  setShips() {
    this.gameBoard.addShip(this.carrier);
    this.gameBoard.addShip(this.battleship);
    this.gameBoard.addShip(this.destroyer);
    this.gameBoard.addShip(this.submarine);
    this.gameBoard.addShip(this.patrolBoat);
  }
}
