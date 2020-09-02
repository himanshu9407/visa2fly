import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementNetherlandComponent } from './requirement-netherland.component';

describe('RequirementNetherlandComponent', () => {
  let component: RequirementNetherlandComponent;
  let fixture: ComponentFixture<RequirementNetherlandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementNetherlandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementNetherlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
