import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsMalaysiaComponent } from './important-points-malaysia.component';

describe('ImportantPointsMalaysiaComponent', () => {
  let component: ImportantPointsMalaysiaComponent;
  let fixture: ComponentFixture<ImportantPointsMalaysiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsMalaysiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsMalaysiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
