import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementAntiguaComponent } from './requirement-antigua.component';

describe('RequirementAntiguaComponent', () => {
  let component: RequirementAntiguaComponent;
  let fixture: ComponentFixture<RequirementAntiguaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementAntiguaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementAntiguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
