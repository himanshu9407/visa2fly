import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsUsaComponent } from './requirements-usa.component';

describe('RequirementsUsaComponent', () => {
  let component: RequirementsUsaComponent;
  let fixture: ComponentFixture<RequirementsUsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementsUsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementsUsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
