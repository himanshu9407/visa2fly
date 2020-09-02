import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationZambiaComponent } from './quotation-zambia.component';

describe('QuotationZambiaComponent', () => {
  let component: QuotationZambiaComponent;
  let fixture: ComponentFixture<QuotationZambiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationZambiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationZambiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
