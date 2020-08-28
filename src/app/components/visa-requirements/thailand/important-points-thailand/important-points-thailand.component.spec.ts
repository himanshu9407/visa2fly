import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsThailandComponent } from './important-points-thailand.component';

describe('ImportantPointsThailandComponent', () => {
  let component: ImportantPointsThailandComponent;
  let fixture: ComponentFixture<ImportantPointsThailandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsThailandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsThailandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
