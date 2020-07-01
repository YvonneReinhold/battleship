import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-end-game-dialog',
  templateUrl: './end-game-dialog.component.html',
  styleUrls: ['./end-game-dialog.component.scss']
})
export class EndGameDialogComponent implements OnInit {

  @Input() gameLost: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
