import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsQatarComponent } from './important-points-qatar.component';

describe('ImportantPointsQatarComponent', () => {
  let component: ImportantPointsQatarComponent;
  let fixture: ComponentFixture<ImportantPointsQatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsQatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsQatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
