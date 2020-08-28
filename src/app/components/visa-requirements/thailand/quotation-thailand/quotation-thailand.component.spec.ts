import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationThailandComponent } from './quotation-thailand.component';

describe('QuotationThailandComponent', () => {
  let component: QuotationThailandComponent;
  let fixture: ComponentFixture<QuotationThailandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationThailandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationThailandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
