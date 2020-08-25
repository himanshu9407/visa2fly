import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineProcessStepsComponent } from './online-process-steps.component';

describe('OnlineProcessStepsComponent', () => {
  let component: OnlineProcessStepsComponent;
  let fixture: ComponentFixture<OnlineProcessStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineProcessStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineProcessStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
