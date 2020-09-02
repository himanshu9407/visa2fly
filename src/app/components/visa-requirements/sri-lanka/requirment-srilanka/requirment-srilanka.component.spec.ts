import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirmentSrilankaComponent } from './requirment-srilanka.component';

describe('RequirmentSrilankaComponent', () => {
  let component: RequirmentSrilankaComponent;
  let fixture: ComponentFixture<RequirmentSrilankaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirmentSrilankaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirmentSrilankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
