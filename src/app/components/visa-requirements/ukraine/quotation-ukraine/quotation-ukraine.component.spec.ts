import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationUkraineComponent } from './quotation-ukraine.component';

describe('QuotationUkraineComponent', () => {
  let component: QuotationUkraineComponent;
  let fixture: ComponentFixture<QuotationUkraineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationUkraineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationUkraineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
