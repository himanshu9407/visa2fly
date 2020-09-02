import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationSouthafricaComponent } from './quotation-southafrica.component';

describe('QuotationSouthafricaComponent', () => {
  let component: QuotationSouthafricaComponent;
  let fixture: ComponentFixture<QuotationSouthafricaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationSouthafricaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationSouthafricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
