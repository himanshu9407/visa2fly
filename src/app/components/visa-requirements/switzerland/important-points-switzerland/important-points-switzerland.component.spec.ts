import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsSwitzerlandComponent } from './important-points-switzerland.component';

describe('ImportantPointsSwitzerlandComponent', () => {
  let component: ImportantPointsSwitzerlandComponent;
  let fixture: ComponentFixture<ImportantPointsSwitzerlandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsSwitzerlandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsSwitzerlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
