import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BehrainComponent } from './behrain.component';

describe('BehrainComponent', () => {
  let component: BehrainComponent;
  let fixture: ComponentFixture<BehrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BehrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BehrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
