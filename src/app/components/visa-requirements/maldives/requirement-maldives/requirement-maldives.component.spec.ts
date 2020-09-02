import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementMaldivesComponent } from './requirement-maldives.component';

describe('RequirementMaldivesComponent', () => {
  let component: RequirementMaldivesComponent;
  let fixture: ComponentFixture<RequirementMaldivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementMaldivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementMaldivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
