import { Injectable } from '@angular/core';
import { Ship, Direction } from '../models/ships/Ship';
import { Board } from '../models/Board';
import { Carrier } from '../models/ships/Carrier';
import { Coordinate } from '../models/Coordinate';
import { Battleship } from '../models/ships/Battleship';
import { Destroyer } from '../models/ships/Destroyer';
import { Submarine } from '../models/ships/Submarine';
import { PatrolBoat } from '../models/ships/PatrolBoat';

@Injectable({
  providedIn: 'root'
})
export class GameBoardService {

  constructor() {
  }

  getNewGameBoard(width: number, height: number, ships: Array<Ship>, availableShots: number): Board {
    const board = new Board(width, height, availableShots);
    ships.forEach( ship => {
      board.addShip(ship);
    });
    return board;
  }

}
