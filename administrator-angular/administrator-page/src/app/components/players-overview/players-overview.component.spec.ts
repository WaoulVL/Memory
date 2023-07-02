import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersOverviewComponent } from './players-overview.component';

describe('PlayersOverviewComponent', () => {
  let component: PlayersOverviewComponent;
  let fixture: ComponentFixture<PlayersOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersOverviewComponent]
    });
    fixture = TestBed.createComponent(PlayersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
