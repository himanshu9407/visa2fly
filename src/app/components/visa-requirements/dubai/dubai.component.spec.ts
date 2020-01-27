import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DubaiComponent } from './dubai.component';

describe('DubaiComponent', () => {
  let component: DubaiComponent;
  let fixture: ComponentFixture<DubaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DubaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DubaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
