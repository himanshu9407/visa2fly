import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationQatarComponent } from './quotation-qatar.component';

describe('QuotationQatarComponent', () => {
  let component: QuotationQatarComponent;
  let fixture: ComponentFixture<QuotationQatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationQatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationQatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
