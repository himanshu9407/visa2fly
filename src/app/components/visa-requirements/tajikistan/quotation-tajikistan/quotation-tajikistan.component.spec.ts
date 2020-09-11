import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationTajikistanComponent } from './quotation-tajikistan.component';

describe('QuotationTajikistanComponent', () => {
  let component: QuotationTajikistanComponent;
  let fixture: ComponentFixture<QuotationTajikistanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationTajikistanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationTajikistanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
