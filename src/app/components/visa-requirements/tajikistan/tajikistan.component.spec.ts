import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TajikistanComponent } from './tajikistan.component';

describe('TajikistanComponent', () => {
  let component: TajikistanComponent;
  let fixture: ComponentFixture<TajikistanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TajikistanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TajikistanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
