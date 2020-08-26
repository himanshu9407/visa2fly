import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsZambiaComponent } from './important-points-zambia.component';

describe('ImportantPointsZambiaComponent', () => {
  let component: ImportantPointsZambiaComponent;
  let fixture: ComponentFixture<ImportantPointsZambiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsZambiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsZambiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
