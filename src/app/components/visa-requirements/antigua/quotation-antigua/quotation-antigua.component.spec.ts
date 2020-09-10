import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationAntiguaComponent } from './quotation-antigua.component';

describe('QuotationAntiguaComponent', () => {
  let component: QuotationAntiguaComponent;
  let fixture: ComponentFixture<QuotationAntiguaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationAntiguaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationAntiguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
