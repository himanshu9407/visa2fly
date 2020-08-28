import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsUaeComponent } from './important-points-uae.component';

describe('ImportantPointsUaeComponent', () => {
  let component: ImportantPointsUaeComponent;
  let fixture: ComponentFixture<ImportantPointsUaeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsUaeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsUaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
