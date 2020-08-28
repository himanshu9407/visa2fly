import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationUaeComponent } from './quotation-uae.component';

describe('QuotationUaeComponent', () => {
  let component: QuotationUaeComponent;
  let fixture: ComponentFixture<QuotationUaeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationUaeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationUaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
