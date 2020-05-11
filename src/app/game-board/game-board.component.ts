import { Component, OnInit } from '@angular/core';
import { GameBoardService } from '../service/game-board.service';
import { Field } from '../models/Field';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  constructor(private gameBoardService: GameBoardService) { }

  ngOnInit() {
    this.gameBoardService.initializeBoard();
  }

  getFailedShots(): number {
    return this.gameBoardService.getFailedShots();
  }

  getHorizontalHeader() {
    return this.gameBoardService.getHorizontalHeader();
  }

  getGameBoardWidth(): number {
    return this.gameBoardService.getWidth();
  }

  getFields() {
    return this.gameBoardService.getFields();
  }

  shoot(field: Field) {
    this.gameBoardService.shoot(field);
  }
}
