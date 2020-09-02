import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsTurkeyComponent } from './requirements-turkey.component';

describe('RequirementsTurkeyComponent', () => {
  let component: RequirementsTurkeyComponent;
  let fixture: ComponentFixture<RequirementsTurkeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementsTurkeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementsTurkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
