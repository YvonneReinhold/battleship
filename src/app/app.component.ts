import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  startGame: boolean;
  resetGame: boolean;

  @Output() resetGameBoardEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.startGame = false;
    this.resetGame = false;
  }

  startButtonClicked() {
    this.startGame = true;
    console.log('startButtonClicked()');
  }

  isStartButtonClicked(): boolean {
    return this.startGame;
  }

  resetButtonClicked() {
    this.resetGame = true;
    console.log('resetButtonClicked()');
  }

  isResetButtonClicked(): boolean {
    return this.startGame;
  }
}
