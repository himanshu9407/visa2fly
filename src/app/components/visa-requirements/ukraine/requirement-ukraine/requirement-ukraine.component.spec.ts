import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementUkraineComponent } from './requirement-ukraine.component';

describe('RequirementUkraineComponent', () => {
  let component: RequirementUkraineComponent;
  let fixture: ComponentFixture<RequirementUkraineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementUkraineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementUkraineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
