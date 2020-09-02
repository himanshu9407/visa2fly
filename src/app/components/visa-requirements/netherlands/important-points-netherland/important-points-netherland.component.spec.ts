import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsNetherlandComponent } from './important-points-netherland.component';

describe('ImportantPointsNetherlandComponent', () => {
  let component: ImportantPointsNetherlandComponent;
  let fixture: ComponentFixture<ImportantPointsNetherlandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsNetherlandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsNetherlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
