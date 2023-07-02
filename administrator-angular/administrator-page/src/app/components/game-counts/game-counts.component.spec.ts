import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCountsComponent } from './game-counts.component';

describe('GameCountsComponent', () => {
  let component: GameCountsComponent;
  let fixture: ComponentFixture<GameCountsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameCountsComponent]
    });
    fixture = TestBed.createComponent(GameCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
