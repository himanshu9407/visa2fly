import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineProcessStepsComponent } from './offline-process-steps.component';

describe('OfflineProcessStepsComponent', () => {
  let component: OfflineProcessStepsComponent;
  let fixture: ComponentFixture<OfflineProcessStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineProcessStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineProcessStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
