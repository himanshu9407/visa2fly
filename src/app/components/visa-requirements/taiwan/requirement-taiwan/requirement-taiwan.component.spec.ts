import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementTaiwanComponent } from './requirement-taiwan.component';

describe('RequirementTaiwanComponent', () => {
  let component: RequirementTaiwanComponent;
  let fixture: ComponentFixture<RequirementTaiwanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementTaiwanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementTaiwanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
