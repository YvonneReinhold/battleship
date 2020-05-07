import { Ship, Direction, ShipType, ShipLength } from './Ship';
import { Coordinate } from '../Coordinate';

export class Destroyer extends Ship {

  constructor(startCoordinate: Coordinate, direction: Direction) {
    super(startCoordinate, direction);
    this.type = ShipType.DESTROYER;
    this.length = ShipLength.DESTROYER;
  }

}
