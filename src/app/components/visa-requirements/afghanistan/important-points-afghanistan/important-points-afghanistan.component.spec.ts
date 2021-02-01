import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsAfghanistanComponent } from './important-points-afghanistan.component';

describe('ImportantPointsAfghanistanComponent', () => {
  let component: ImportantPointsAfghanistanComponent;
  let fixture: ComponentFixture<ImportantPointsAfghanistanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsAfghanistanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsAfghanistanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
