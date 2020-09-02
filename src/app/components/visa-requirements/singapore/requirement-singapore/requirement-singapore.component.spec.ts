import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementSingaporeComponent } from './requirement-singapore.component';

describe('RequirementSingaporeComponent', () => {
  let component: RequirementSingaporeComponent;
  let fixture: ComponentFixture<RequirementSingaporeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementSingaporeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementSingaporeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
