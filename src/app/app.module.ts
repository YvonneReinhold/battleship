import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { ScoreCardComponent } from './score-card/score-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ResetGameBoardDialogComponent } from './reset-game-board-dialog/reset-game-board-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameBoardComponent,
    ScoreCardComponent,
    ResetGameBoardDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
