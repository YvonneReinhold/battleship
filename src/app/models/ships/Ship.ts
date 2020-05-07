import { Coordinate } from '../Coordinate';

export enum ShipType {
  UNKOWN = 'Unknown ship type.',
  CARRIER = 'Carrier',
  BATTLESHIP = 'Battleship',
  DESTROYER = 'Destroyer',
  SUBMARINE = 'Submarine',
  PATROL_BOAT = 'Patrol Boat'
}

export enum ShipLength {
  UNKOWN = 0,
  CARRIER = 5,
  BATTLESHIP = 4,
  DESTROYER = 3,
  SUBMARINE = 3,
  PATROL_BOAT = 2
}

export enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

export class Ship {

  startCoordinate: Coordinate;
  direction: Direction;
  type: ShipType;
  length: ShipLength;
  hitCounter: number;

  constructor(startCoordinate: Coordinate, direction: Direction) {
    this.startCoordinate = startCoordinate;
    this.direction = direction;
    this.type = ShipType.UNKOWN;
    this.length = ShipLength.UNKOWN;
    this.hitCounter = 0;
  }

  hit() {
    this.hitCounter++;
  }

  isSunken(): boolean {
    return this.length === this.hitCounter;
  }

  getDescription(): string {
    return this.type +
            ' at x: ' + this.startCoordinate.x +
            ' y: ' + this.startCoordinate.y +
            ' hitCount: ' + this.hitCounter;
  }
}
