import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsComponent } from './important-points.component';

describe('ImportantPointsComponent', () => {
  let component: ImportantPointsComponent;
  let fixture: ComponentFixture<ImportantPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
