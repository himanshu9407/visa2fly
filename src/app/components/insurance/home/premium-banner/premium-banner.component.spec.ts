import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumBannerComponent } from './premium-banner.component';

describe('PremiumBannerComponent', () => {
  let component: PremiumBannerComponent;
  let fixture: ComponentFixture<PremiumBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
