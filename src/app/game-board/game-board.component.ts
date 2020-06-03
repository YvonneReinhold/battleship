import { Component, OnInit, Input, OnChanges, EventEmitter } from '@angular/core';
import { GameBoardService } from '../service/game-board.service';
import { Field } from '../models/Field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Board } from '../models/Board';
import { StatusImage } from '../models/StatusImage';
import { Carrier } from '../models/ships/Carrier';
import { Coordinate } from '../models/Coordinate';
import { Direction, Ship } from '../models/ships/Ship';
import { Battleship } from '../models/ships/Battleship';
import { Destroyer } from '../models/ships/Destroyer';
import { Submarine } from '../models/ships/Submarine';
import { PatrolBoat } from '../models/ships/PatrolBoat';

const HEADER_HORIZONTAL = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  /**
   * Input  true - Game board is shown; false - Game board is hidden.
   */
  @Input() showGameBoard: boolean;
  @Input() board: Board;

  constructor(private snackbar: MatSnackBar) { }

  ngOnInit() {}

  /**
   * Get the horizontal header text. Since the header text is A-Z.
   * @returns  A array of characters for header text purpose.
   */
  getHorizontalHeader() {
    return HEADER_HORIZONTAL.slice(0, this.board.getWidth());
  }

  /**
   * Get the whole game board.
   * @returns The whole game board.
   */
  getGameBoard(): Board {
    return this.board;
  }

  /**
   * Shoot at a field on the game board.
   * @param field Game board field.
   * @returns true if the shoot hit a ship; false otherwise
   */
  shoot(field: Field): boolean {
    if (field.isShot) {
      // field already clicked -> do nothing
      return;
    }
    this.snackbar.open('Shoot at field (' + field.coordinate.x + ', ' + field.coordinate.y + ')' );
    field.isShot = true;
    if (field.ship != null) {
      field.statusImage = StatusImage.SHIP;
      field.ship.hit();
      if (field.ship.isSunken()) {
        this.killShip(field.ship);
      }
    } else {
      this.getGameBoard().incrementFailedShots();
      field.statusImage = StatusImage.SEA_SHOT;
    }
  }

  /**
   * Mark all fields of a ship on the board, if it is sunken.
   * @param ship The sunken ship that has to be marked.
   */
  private killShip(ship: Ship) {
    this.board.getFieldsAsFlattenArray().forEach((field: Field) => {
      if (field.ship === ship) {
        field.statusImage = StatusImage.SHIP_KILLED;
      }
    });
  }
}
