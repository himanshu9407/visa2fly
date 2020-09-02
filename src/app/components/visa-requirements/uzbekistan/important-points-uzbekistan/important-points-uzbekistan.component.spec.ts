import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsUzbekistanComponent } from './important-points-uzbekistan.component';

describe('ImportantPointsUzbekistanComponent', () => {
  let component: ImportantPointsUzbekistanComponent;
  let fixture: ComponentFixture<ImportantPointsUzbekistanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsUzbekistanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsUzbekistanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
