import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementMalaysiaComponent } from './requirement-malaysia.component';

describe('RequirementMalaysiaComponent', () => {
  let component: RequirementMalaysiaComponent;
  let fixture: ComponentFixture<RequirementMalaysiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementMalaysiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementMalaysiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
