import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsTurkeyComponent } from './important-points-turkey.component';

describe('ImportantPointsTurkeyComponent', () => {
  let component: ImportantPointsTurkeyComponent;
  let fixture: ComponentFixture<ImportantPointsTurkeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsTurkeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsTurkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
