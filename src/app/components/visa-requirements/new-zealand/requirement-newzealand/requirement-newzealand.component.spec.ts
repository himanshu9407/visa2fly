import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementNewzealandComponent } from './requirement-newzealand.component';

describe('RequirementNewzealandComponent', () => {
  let component: RequirementNewzealandComponent;
  let fixture: ComponentFixture<RequirementNewzealandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementNewzealandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementNewzealandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
