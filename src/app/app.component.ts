import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Board } from './models/Board';
import { GameBoardService } from './service/game-board.service';
import { Ship, Direction } from './models/ships/Ship';
import { Carrier } from './models/ships/Carrier';
import { Coordinate } from './models/Coordinate';
import { Battleship } from './models/ships/Battleship';
import { Destroyer } from './models/ships/Destroyer';
import { Submarine } from './models/ships/Submarine';
import { PatrolBoat } from './models/ships/PatrolBoat';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResetGameBoardDialogComponent } from './reset-game-board-dialog/reset-game-board-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isGameBoardShown: boolean;
  availableShots: number;
  board: Board;

  constructor(private gameBoardService: GameBoardService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.isGameBoardShown = false;
  }

  startNewGame() {
    this.isGameBoardShown = true;

    // first call of our game board component
    // the start button was pressed
    this.initializeNewBoard();
  }

  endGame() {
    console.log('Game over?: ', this.board.isGameOver());
    console.log('Game failed?: ', this.board.isGameFailed());
  }

  resetGame() {
    console.log('Missed shots: ', this.board.getFailedShots());
    this.isGameBoardShown = true;

    const observer = {
        next: (result: boolean) => {
          console.log('app.startNewGame() -> afterClosed: ', result);
          if (result) {
            this.initializeNewBoard();
          }
        },
        error: (value) => {
          console.error('Oooops. ', value);
        },
        complete: () => {
          console.log('Close dialog finished.');
        }
      };

    this.openResetDialog().afterClosed().subscribe(observer);
  }

  getMissedShots(): number {
    if (this.board) {
      return this.board.getFailedShots();
    }
    return 0;
  }

  getAvailableShots(): number {
    if (this.board) {
      return this.board.getAvailableShots();
    }
    return 0;
  }

  private openResetDialog(): MatDialogRef<ResetGameBoardDialogComponent>  {
    const resetDialogRef = this.dialog.open(ResetGameBoardDialogComponent, {
      height: '160px',
      width: '320px',
    });
    return resetDialogRef;
  }

  /**
   * Get a new game board, add hidden ships and set failed shots to zero.
   */
  private initializeNewBoard() {
    // TODO: Randomize ship positions
    const ships: Ship[] = [
        new Carrier(new Coordinate(2, 5), Direction.Right),
        new Battleship(new Coordinate(2, 0), Direction.Down),
        new Destroyer(new Coordinate(6, 8), Direction.Right),
        new Submarine(new Coordinate(0, 1), Direction.Down),
        new PatrolBoat(new Coordinate(4, 7), Direction.Down)
      ];
    // TODO: OPTIONS: Make this value editable in a settings dialog.
    this.availableShots = 30;
    // TODO: OPTIONS: Add board width and height to the options panel.
    this.board = this.gameBoardService.getNewGameBoard(10, 10, ships, this.availableShots);
  }

}
