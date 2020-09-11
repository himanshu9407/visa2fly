import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationRussiaComponent } from './quotation-russia.component';

describe('QuotationRussiaComponent', () => {
  let component: QuotationRussiaComponent;
  let fixture: ComponentFixture<QuotationRussiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationRussiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationRussiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
