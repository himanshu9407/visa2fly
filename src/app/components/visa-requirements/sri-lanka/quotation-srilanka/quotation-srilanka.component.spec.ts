import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationSrilankaComponent } from './quotation-srilanka.component';

describe('QuotationSrilankaComponent', () => {
  let component: QuotationSrilankaComponent;
  let fixture: ComponentFixture<QuotationSrilankaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationSrilankaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationSrilankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
