import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss']
})
export class ScoreCardComponent implements OnInit {

  @Output() startOrResetGameEvent = new EventEmitter();

  buttonText: string;
  isGameRunning: boolean;
  availableShots: number;

  ngOnInit() {
    this.buttonText = 'Start';
    this.isGameRunning = false;
    this.availableShots = 30;
  }

  startOrResetGame() {
    this.buttonText = 'Reset';
    this.isGameRunning = true;
    this.startOrResetGameEvent.emit();
  }
}
