import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsNewzealandComponent } from './important-points-newzealand.component';

describe('ImportantPointsNewzealandComponent', () => {
  let component: ImportantPointsNewzealandComponent;
  let fixture: ComponentFixture<ImportantPointsNewzealandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsNewzealandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsNewzealandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
