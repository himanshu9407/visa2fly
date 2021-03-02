import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsMyanmarComponent } from './important-points-myanmar.component';

describe('ImportantPointsMyanmarComponent', () => {
  let component: ImportantPointsMyanmarComponent;
  let fixture: ComponentFixture<ImportantPointsMyanmarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsMyanmarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsMyanmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
