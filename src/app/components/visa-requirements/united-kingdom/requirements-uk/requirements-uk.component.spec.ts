import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsUkComponent } from './requirements-uk.component';

describe('RequirementsUkComponent', () => {
  let component: RequirementsUkComponent;
  let fixture: ComponentFixture<RequirementsUkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementsUkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementsUkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
