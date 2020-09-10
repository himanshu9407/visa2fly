import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsAntiguaComponent } from './important-points-antigua.component';

describe('ImportantPointsAntiguaComponent', () => {
  let component: ImportantPointsAntiguaComponent;
  let fixture: ComponentFixture<ImportantPointsAntiguaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsAntiguaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsAntiguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
