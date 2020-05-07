import { Ship, Direction, ShipType, ShipLength } from './Ship';
import { Coordinate } from '../Coordinate';

export class PatrolBoat extends Ship {

  constructor(startCoordinate: Coordinate, direction: Direction) {
    super(startCoordinate, direction);
    this.type = ShipType.PATROL_BOAT;
    this.length = ShipLength.PATROL_BOAT;
  }

}
