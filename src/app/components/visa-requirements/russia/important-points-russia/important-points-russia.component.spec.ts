import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsRussiaComponent } from './important-points-russia.component';

describe('ImportantPointsRussiaComponent', () => {
  let component: ImportantPointsRussiaComponent;
  let fixture: ComponentFixture<ImportantPointsRussiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsRussiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsRussiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
