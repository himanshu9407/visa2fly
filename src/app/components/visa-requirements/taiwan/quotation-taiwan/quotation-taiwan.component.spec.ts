import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationTaiwanComponent } from './quotation-taiwan.component';

describe('QuotationTaiwanComponent', () => {
  let component: QuotationTaiwanComponent;
  let fixture: ComponentFixture<QuotationTaiwanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationTaiwanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationTaiwanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
