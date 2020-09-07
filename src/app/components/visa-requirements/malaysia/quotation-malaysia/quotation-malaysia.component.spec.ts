import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationMalaysiaComponent } from './quotation-malaysia.component';

describe('QuotationMalaysiaComponent', () => {
  let component: QuotationMalaysiaComponent;
  let fixture: ComponentFixture<QuotationMalaysiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationMalaysiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationMalaysiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
