import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationSwitzerlandComponent } from './quotation-switzerland.component';

describe('QuotationSwitzerlandComponent', () => {
  let component: QuotationSwitzerlandComponent;
  let fixture: ComponentFixture<QuotationSwitzerlandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationSwitzerlandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationSwitzerlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
