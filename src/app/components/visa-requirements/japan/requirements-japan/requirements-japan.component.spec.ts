import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsJapanComponent } from './requirements-japan.component';

describe('RequirementsJapanComponent', () => {
  let component: RequirementsJapanComponent;
  let fixture: ComponentFixture<RequirementsJapanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementsJapanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementsJapanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
