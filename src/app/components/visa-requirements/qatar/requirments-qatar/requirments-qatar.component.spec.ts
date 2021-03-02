import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirmentsQatarComponent } from './requirments-qatar.component';

describe('RequirmentsQatarComponent', () => {
  let component: RequirmentsQatarComponent;
  let fixture: ComponentFixture<RequirmentsQatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirmentsQatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirmentsQatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
