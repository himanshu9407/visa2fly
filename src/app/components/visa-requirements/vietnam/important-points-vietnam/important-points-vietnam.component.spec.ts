import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsVietnamComponent } from './important-points-vietnam.component';

describe('ImportantPointsVietnamComponent', () => {
  let component: ImportantPointsVietnamComponent;
  let fixture: ComponentFixture<ImportantPointsVietnamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsVietnamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsVietnamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
