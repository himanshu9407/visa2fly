import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationUzbekistanComponent } from './quotation-uzbekistan.component';

describe('QuotationUzbekistanComponent', () => {
  let component: QuotationUzbekistanComponent;
  let fixture: ComponentFixture<QuotationUzbekistanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationUzbekistanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationUzbekistanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
