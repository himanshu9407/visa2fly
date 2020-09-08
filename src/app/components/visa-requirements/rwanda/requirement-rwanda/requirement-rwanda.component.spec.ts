import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementRwandaComponent } from './requirement-rwanda.component';

describe('RequirementRwandaComponent', () => {
  let component: RequirementRwandaComponent;
  let fixture: ComponentFixture<RequirementRwandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementRwandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementRwandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
