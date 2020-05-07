import { Ship, Direction, ShipType, ShipLength } from './Ship';
import { Coordinate } from '../Coordinate';

export class Battleship extends Ship {

  constructor(startCoordinate: Coordinate, direction: Direction) {
    super(startCoordinate, direction);
    this.type = ShipType.BATTLESHIP;
    this.length = ShipLength.BATTLESHIP;
  }

}
