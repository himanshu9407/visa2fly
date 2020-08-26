import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsJapanComponent } from './important-points-japan.component';

describe('ImportantPointsJapanComponent', () => {
  let component: ImportantPointsJapanComponent;
  let fixture: ComponentFixture<ImportantPointsJapanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsJapanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsJapanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
