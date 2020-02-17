import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bMobileNavComponent } from './b2b-mobile-nav.component';

describe('B2bMobileNavComponent', () => {
  let component: B2bMobileNavComponent;
  let fixture: ComponentFixture<B2bMobileNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bMobileNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bMobileNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
