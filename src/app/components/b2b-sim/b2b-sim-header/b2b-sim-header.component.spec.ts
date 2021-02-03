import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bSimHeaderComponent } from './b2b-sim-header.component';

describe('B2bSimHeaderComponent', () => {
  let component: B2bSimHeaderComponent;
  let fixture: ComponentFixture<B2bSimHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bSimHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bSimHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
