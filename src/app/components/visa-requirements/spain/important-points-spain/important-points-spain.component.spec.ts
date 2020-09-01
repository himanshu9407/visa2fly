import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsSpainComponent } from './important-points-spain.component';

describe('ImportantPointsSpainComponent', () => {
  let component: ImportantPointsSpainComponent;
  let fixture: ComponentFixture<ImportantPointsSpainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsSpainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsSpainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
