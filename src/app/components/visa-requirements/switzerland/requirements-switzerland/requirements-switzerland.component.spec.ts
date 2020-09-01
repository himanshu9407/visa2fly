import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsSwitzerlandComponent } from './requirements-switzerland.component';

describe('RequirementsSwitzerlandComponent', () => {
  let component: RequirementsSwitzerlandComponent;
  let fixture: ComponentFixture<RequirementsSwitzerlandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementsSwitzerlandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementsSwitzerlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
