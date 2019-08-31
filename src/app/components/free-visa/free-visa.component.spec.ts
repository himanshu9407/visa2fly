import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeVisaComponent } from './free-visa.component';

describe('FreeVisaComponent', () => {
  let component: FreeVisaComponent;
  let fixture: ComponentFixture<FreeVisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeVisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
