import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementUgandaComponent } from './requirement-uganda.component';

describe('RequirementUgandaComponent', () => {
  let component: RequirementUgandaComponent;
  let fixture: ComponentFixture<RequirementUgandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementUgandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementUgandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
