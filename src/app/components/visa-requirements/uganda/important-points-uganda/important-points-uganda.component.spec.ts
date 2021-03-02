import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsUgandaComponent } from './important-points-uganda.component';

describe('ImportantPointsUgandaComponent', () => {
  let component: ImportantPointsUgandaComponent;
  let fixture: ComponentFixture<ImportantPointsUgandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsUgandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsUgandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
