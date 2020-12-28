import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumPlansComponent } from './premium-plans.component';

describe('PremiumPlansComponent', () => {
  let component: PremiumPlansComponent;
  let fixture: ComponentFixture<PremiumPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
