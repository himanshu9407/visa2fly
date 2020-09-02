import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationNetherlandComponent } from './quotation-netherland.component';

describe('QuotationNetherlandComponent', () => {
  let component: QuotationNetherlandComponent;
  let fixture: ComponentFixture<QuotationNetherlandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationNetherlandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationNetherlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
