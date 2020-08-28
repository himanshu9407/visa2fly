import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementThailandComponent } from './requirement-thailand.component';

describe('RequirementThailandComponent', () => {
  let component: RequirementThailandComponent;
  let fixture: ComponentFixture<RequirementThailandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementThailandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementThailandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
