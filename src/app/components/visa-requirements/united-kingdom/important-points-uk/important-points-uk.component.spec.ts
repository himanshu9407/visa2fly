import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsUkComponent } from './important-points-uk.component';

describe('ImportantPointsUkComponent', () => {
  let component: ImportantPointsUkComponent;
  let fixture: ComponentFixture<ImportantPointsUkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsUkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsUkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
