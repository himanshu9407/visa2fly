import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsSingaporeComponent } from './important-points-singapore.component';

describe('ImportantPointsSingaporeComponent', () => {
  let component: ImportantPointsSingaporeComponent;
  let fixture: ComponentFixture<ImportantPointsSingaporeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsSingaporeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsSingaporeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
