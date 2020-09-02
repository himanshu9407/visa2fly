import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsUzbekistanComponent } from './requirements-uzbekistan.component';

describe('RequirementsUzbekistanComponent', () => {
  let component: RequirementsUzbekistanComponent;
  let fixture: ComponentFixture<RequirementsUzbekistanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementsUzbekistanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementsUzbekistanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
