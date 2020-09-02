import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationUkComponent } from './quotation-uk.component';

describe('QuotationUkComponent', () => {
  let component: QuotationUkComponent;
  let fixture: ComponentFixture<QuotationUkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationUkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationUkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
