import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqQatarComponent } from './faq-qatar.component';

describe('FaqQatarComponent', () => {
  let component: FaqQatarComponent;
  let fixture: ComponentFixture<FaqQatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqQatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqQatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
