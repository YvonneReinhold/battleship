import { Component, OnInit } from '@angular/core';

/**
 *  No. Class of ship   Size
 *   1 	Carrier 		    5
 *   2 	Battleship 		  4
 *   3 	Destroyer 		  3
 *   4 	Submarine 	  	3
 *   5	Patrol Boat 	  2
 */


@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss']
})
export class ScoreCardComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
