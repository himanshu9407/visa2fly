import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsUkraineComponent } from './important-points-ukraine.component';

describe('ImportantPointsUkraineComponent', () => {
  let component: ImportantPointsUkraineComponent;
  let fixture: ComponentFixture<ImportantPointsUkraineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsUkraineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsUkraineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
