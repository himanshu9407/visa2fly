import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationSpainComponent } from './quotation-spain.component';

describe('QuotationSpainComponent', () => {
  let component: QuotationSpainComponent;
  let fixture: ComponentFixture<QuotationSpainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationSpainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationSpainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
