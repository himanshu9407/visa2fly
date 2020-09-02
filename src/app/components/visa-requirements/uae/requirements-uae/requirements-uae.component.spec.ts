import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsUaeComponent } from './requirements-uae.component';

describe('RequirementsUaeComponent', () => {
  let component: RequirementsUaeComponent;
  let fixture: ComponentFixture<RequirementsUaeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementsUaeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementsUaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
