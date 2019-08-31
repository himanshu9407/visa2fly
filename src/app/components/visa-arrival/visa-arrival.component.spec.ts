import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaArrivalComponent } from './visa-arrival.component';

describe('VisaArrivalComponent', () => {
  let component: VisaArrivalComponent;
  let fixture: ComponentFixture<VisaArrivalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisaArrivalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
