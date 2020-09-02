import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsZambiaComponent } from './requirements-zambia.component';

describe('RequirementsZambiaComponent', () => {
  let component: RequirementsZambiaComponent;
  let fixture: ComponentFixture<RequirementsZambiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementsZambiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementsZambiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
