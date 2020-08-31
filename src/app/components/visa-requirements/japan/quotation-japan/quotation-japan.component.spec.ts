import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationJapanComponent } from './quotation-japan.component';

describe('QuotationJapanComponent', () => {
  let component: QuotationJapanComponent;
  let fixture: ComponentFixture<QuotationJapanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationJapanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationJapanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
