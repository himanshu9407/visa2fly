import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsTaiwanComponent } from './important-points-taiwan.component';

describe('ImportantPointsTaiwanComponent', () => {
  let component: ImportantPointsTaiwanComponent;
  let fixture: ComponentFixture<ImportantPointsTaiwanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsTaiwanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsTaiwanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
