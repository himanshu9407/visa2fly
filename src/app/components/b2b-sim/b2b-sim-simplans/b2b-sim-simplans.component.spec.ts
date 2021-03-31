import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bSimSimplansComponent } from './b2b-sim-simplans.component';

describe('B2bSimSimplansComponent', () => {
  let component: B2bSimSimplansComponent;
  let fixture: ComponentFixture<B2bSimSimplansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bSimSimplansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bSimSimplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
