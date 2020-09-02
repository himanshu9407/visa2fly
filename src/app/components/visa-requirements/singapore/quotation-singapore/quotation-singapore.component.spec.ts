import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationSingaporeComponent } from './quotation-singapore.component';

describe('QuotationSingaporeComponent', () => {
  let component: QuotationSingaporeComponent;
  let fixture: ComponentFixture<QuotationSingaporeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationSingaporeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationSingaporeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
