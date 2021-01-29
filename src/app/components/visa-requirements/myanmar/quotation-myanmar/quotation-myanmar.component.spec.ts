import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationMyanmarComponent } from './quotation-myanmar.component';

describe('QuotationMyanmarComponent', () => {
  let component: QuotationMyanmarComponent;
  let fixture: ComponentFixture<QuotationMyanmarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationMyanmarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationMyanmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
