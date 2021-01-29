import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationAfghanistanComponent } from './quotation-afghanistan.component';

describe('QuotationAfghanistanComponent', () => {
  let component: QuotationAfghanistanComponent;
  let fixture: ComponentFixture<QuotationAfghanistanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationAfghanistanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationAfghanistanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
