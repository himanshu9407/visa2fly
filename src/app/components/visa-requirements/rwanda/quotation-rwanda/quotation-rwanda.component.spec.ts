import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationRwandaComponent } from './quotation-rwanda.component';

describe('QuotationRwandaComponent', () => {
  let component: QuotationRwandaComponent;
  let fixture: ComponentFixture<QuotationRwandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationRwandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationRwandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
