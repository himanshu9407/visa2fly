import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryAddressComponent } from './country-address.component';

describe('CountryAddressComponent', () => {
  let component: CountryAddressComponent;
  let fixture: ComponentFixture<CountryAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
