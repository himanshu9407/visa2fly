import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementVietnamComponent } from './requirement-vietnam.component';

describe('RequirementVietnamComponent', () => {
  let component: RequirementVietnamComponent;
  let fixture: ComponentFixture<RequirementVietnamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementVietnamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementVietnamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
