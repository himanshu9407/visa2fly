import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsUsaComponent } from './important-points-usa.component';

describe('ImportantPointsUsaComponent', () => {
  let component: ImportantPointsUsaComponent;
  let fixture: ComponentFixture<ImportantPointsUsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsUsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsUsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
