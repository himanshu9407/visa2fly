import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementSouthafricaComponent } from './requirement-southafrica.component';

describe('RequirementSouthafricaComponent', () => {
  let component: RequirementSouthafricaComponent;
  let fixture: ComponentFixture<RequirementSouthafricaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementSouthafricaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementSouthafricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
