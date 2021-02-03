import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bSimHomeComponent } from './b2b-sim-home.component';

describe('B2bSimHomeComponent', () => {
  let component: B2bSimHomeComponent;
  let fixture: ComponentFixture<B2bSimHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bSimHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bSimHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
