import { Coordinate } from './Coordinate';
import { Ship } from './ships/Ship';
import { StatusImage } from './StatusImage';

enum StatusMessage {
  SEA = 'Sea',
  SEA_SHOT = 'Sea shot',
  SHIP_KILLED = 'Ship killed',
  SHIP = 'Ship'
}

export class Field {
  id: string;
  coordinate: Coordinate;
  ship: Ship;
  isShot: boolean;
  statusMessage: StatusMessage;
  statusImage: StatusImage;

  constructor(xCoord: number, yCoord: number) {
    this.id = 'field_' + xCoord + '_' + yCoord;
    this.coordinate = new Coordinate(xCoord, yCoord);
    this.ship = null;
    this.isShot = false;
    this.statusImage = null;
    this.statusMessage = null;
  }

  setShip(ship: Ship) {
    this.ship = ship;
    this.statusImage = StatusImage.SHIP;
    this.statusMessage = StatusMessage.SHIP;
  }

  reset() {
    this.isShot = false;
    if (this.ship != null) {
      this.statusImage = StatusImage.SHIP;
      this.statusMessage = StatusMessage.SHIP;
    } else {
      this.statusImage = null;
      this.statusMessage = null;
    }
  }
}
