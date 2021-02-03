import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bSimSimcheckoutComponent } from './b2b-sim-simcheckout.component';

describe('B2bSimSimcheckoutComponent', () => {
  let component: B2bSimSimcheckoutComponent;
  let fixture: ComponentFixture<B2bSimSimcheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bSimSimcheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bSimSimcheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
