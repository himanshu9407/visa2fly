import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsRwandaComponent } from './important-points-rwanda.component';

describe('ImportantPointsRwandaComponent', () => {
  let component: ImportantPointsRwandaComponent;
  let fixture: ComponentFixture<ImportantPointsRwandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsRwandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsRwandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
