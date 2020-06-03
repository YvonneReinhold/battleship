import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetGameBoardDialogComponent } from './reset-game-board-dialog.component';

describe('ResetGameBoardDialogComponent', () => {
  let component: ResetGameBoardDialogComponent;
  let fixture: ComponentFixture<ResetGameBoardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetGameBoardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetGameBoardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
