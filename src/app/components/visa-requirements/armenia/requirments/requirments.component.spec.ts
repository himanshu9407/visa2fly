import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirmentsComponent } from './requirments.component';

describe('RequirmentsComponent', () => {
  let component: RequirmentsComponent;
  let fixture: ComponentFixture<RequirmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
