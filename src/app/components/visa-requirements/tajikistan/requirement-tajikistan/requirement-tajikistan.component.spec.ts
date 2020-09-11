import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementTajikistanComponent } from './requirement-tajikistan.component';

describe('RequirementTajikistanComponent', () => {
  let component: RequirementTajikistanComponent;
  let fixture: ComponentFixture<RequirementTajikistanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementTajikistanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementTajikistanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
