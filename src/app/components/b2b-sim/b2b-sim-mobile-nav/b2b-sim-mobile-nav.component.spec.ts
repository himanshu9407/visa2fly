import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bSimMobileNavComponent } from './b2b-sim-mobile-nav.component';

describe('B2bSimMobileNavComponent', () => {
  let component: B2bSimMobileNavComponent;
  let fixture: ComponentFixture<B2bSimMobileNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bSimMobileNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bSimMobileNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
