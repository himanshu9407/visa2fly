import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementMyanmarComponent } from './requirement-myanmar.component';

describe('RequirementMyanmarComponent', () => {
  let component: RequirementMyanmarComponent;
  let fixture: ComponentFixture<RequirementMyanmarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementMyanmarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementMyanmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
