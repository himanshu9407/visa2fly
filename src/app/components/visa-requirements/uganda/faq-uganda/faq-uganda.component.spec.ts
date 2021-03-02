import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqUgandaComponent } from './faq-uganda.component';

describe('FaqUgandaComponent', () => {
  let component: FaqUgandaComponent;
  let fixture: ComponentFixture<FaqUgandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqUgandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqUgandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
