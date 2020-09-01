import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsSpainComponent } from './requirements-spain.component';

describe('RequirementsSpainComponent', () => {
  let component: RequirementsSpainComponent;
  let fixture: ComponentFixture<RequirementsSpainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementsSpainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementsSpainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
