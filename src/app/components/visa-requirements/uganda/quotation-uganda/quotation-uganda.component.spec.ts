import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationUgandaComponent } from './quotation-uganda.component';

describe('QuotationUgandaComponent', () => {
  let component: QuotationUgandaComponent;
  let fixture: ComponentFixture<QuotationUgandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationUgandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationUgandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
