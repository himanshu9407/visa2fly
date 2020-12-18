import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceBookingStatusComponent } from './insurance-booking-status.component';

describe('InsuranceBookingStatusComponent', () => {
  let component: InsuranceBookingStatusComponent;
  let fixture: ComponentFixture<InsuranceBookingStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceBookingStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceBookingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
