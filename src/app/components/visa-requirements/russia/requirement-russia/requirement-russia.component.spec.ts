import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementRussiaComponent } from './requirement-russia.component';

describe('RequirementRussiaComponent', () => {
  let component: RequirementRussiaComponent;
  let fixture: ComponentFixture<RequirementRussiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementRussiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementRussiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
