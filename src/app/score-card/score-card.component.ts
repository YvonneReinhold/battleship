import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss']
})
export class ScoreCardComponent implements OnInit {


  @Output() startGameEvent = new EventEmitter();
  @Output() resetGameEvent = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  startGame() {
    this.startGameEvent.emit();
  }

  resetGame() {
    this.resetGameEvent.emit();
  }
}
