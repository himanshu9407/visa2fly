import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationNewzealandComponent } from './quotation-newzealand.component';

describe('QuotationNewzealandComponent', () => {
  let component: QuotationNewzealandComponent;
  let fixture: ComponentFixture<QuotationNewzealandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationNewzealandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationNewzealandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
