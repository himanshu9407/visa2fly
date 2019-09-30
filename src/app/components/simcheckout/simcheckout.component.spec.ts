import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimcheckoutComponent } from './simcheckout.component';

describe('SimcheckoutComponent', () => {
  let component: SimcheckoutComponent;
  let fixture: ComponentFixture<SimcheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimcheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimcheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
