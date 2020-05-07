import { Ship, Direction, ShipType, ShipLength } from './Ship';
import { Coordinate } from '../Coordinate';

export class Submarine extends Ship {

  constructor(startCoordinate: Coordinate, direction: Direction) {
    super(startCoordinate, direction);
    this.type = ShipType.SUBMARINE;
    this.length = ShipLength.SUBMARINE;
  }

}
