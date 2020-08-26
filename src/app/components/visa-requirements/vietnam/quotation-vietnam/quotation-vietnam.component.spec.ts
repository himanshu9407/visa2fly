import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationVietnamComponent } from './quotation-vietnam.component';

describe('QuotationVietnamComponent', () => {
  let component: QuotationVietnamComponent;
  let fixture: ComponentFixture<QuotationVietnamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationVietnamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationVietnamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
