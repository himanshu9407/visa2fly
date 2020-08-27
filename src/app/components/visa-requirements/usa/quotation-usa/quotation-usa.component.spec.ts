import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationUsaComponent } from './quotation-usa.component';

describe('QuotationUsaComponent', () => {
  let component: QuotationUsaComponent;
  let fixture: ComponentFixture<QuotationUsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationUsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationUsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
