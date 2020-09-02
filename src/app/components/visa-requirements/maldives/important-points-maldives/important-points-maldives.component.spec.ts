import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsMaldivesComponent } from './important-points-maldives.component';

describe('ImportantPointsMaldivesComponent', () => {
  let component: ImportantPointsMaldivesComponent;
  let fixture: ComponentFixture<ImportantPointsMaldivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsMaldivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsMaldivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
