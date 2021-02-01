import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementAfghanistanComponent } from './requirement-afghanistan.component';

describe('RequirementAfghanistanComponent', () => {
  let component: RequirementAfghanistanComponent;
  let fixture: ComponentFixture<RequirementAfghanistanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementAfghanistanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementAfghanistanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
