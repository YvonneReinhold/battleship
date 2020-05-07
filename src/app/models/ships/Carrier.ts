import { Ship, Direction, ShipType, ShipLength } from './Ship';
import { Coordinate } from '../Coordinate';

export class Carrier extends Ship {

  constructor(startCoordinate: Coordinate, direction: Direction) {
    super(startCoordinate, direction);
    this.type = ShipType.CARRIER;
    this.length = ShipLength.CARRIER;
  }

}
