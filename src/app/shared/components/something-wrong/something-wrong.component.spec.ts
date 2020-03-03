import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SomethingWrongComponent } from './something-wrong.component';

describe('SomethingWrongComponent', () => {
  let component: SomethingWrongComponent;
  let fixture: ComponentFixture<SomethingWrongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SomethingWrongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SomethingWrongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
