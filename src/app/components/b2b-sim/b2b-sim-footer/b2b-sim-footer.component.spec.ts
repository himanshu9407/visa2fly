import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bSimFooterComponent } from './b2b-sim-footer.component';

describe('B2bSimFooterComponent', () => {
  let component: B2bSimFooterComponent;
  let fixture: ComponentFixture<B2bSimFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bSimFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bSimFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
