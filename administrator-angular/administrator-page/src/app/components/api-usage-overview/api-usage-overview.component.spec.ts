import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiUsageOverviewComponent } from './api-usage-overview.component';

describe('ApiUsageOverviewComponent', () => {
  let component: ApiUsageOverviewComponent;
  let fixture: ComponentFixture<ApiUsageOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiUsageOverviewComponent]
    });
    fixture = TestBed.createComponent(ApiUsageOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
