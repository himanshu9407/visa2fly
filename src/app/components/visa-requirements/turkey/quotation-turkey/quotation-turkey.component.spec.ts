import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationTurkeyComponent } from './quotation-turkey.component';

describe('QuotationTurkeyComponent', () => {
  let component: QuotationTurkeyComponent;
  let fixture: ComponentFixture<QuotationTurkeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationTurkeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationTurkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
