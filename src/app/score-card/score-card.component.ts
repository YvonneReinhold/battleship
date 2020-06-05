import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss']
})
export class ScoreCardComponent implements OnInit {

  @Output() startNewGameEvent = new EventEmitter();
  @Output() resetGameEvent = new EventEmitter();

  @Input() missedShots: number;

  isGameRunning: boolean;
  availableShots: number;

  ngOnInit() {
    this.isGameRunning = false;
    // TODO: OPTIONS: Make this value editable in a settings dialog.
    this.availableShots = 30;
    console.log('Missed shots: ', this.missedShots);
  }

  startNewGame() {
    this.isGameRunning = true;
    this.startNewGameEvent.emit();
    console.log('Missed shots: ', this.missedShots);
  }

  resetGame() {
    this.isGameRunning = true;
    this.resetGameEvent.emit();
    console.log('Missed shots: ', this.missedShots);
  }

  getAvailableShots(): number {
    return this.availableShots - this.missedShots;
  }
}
