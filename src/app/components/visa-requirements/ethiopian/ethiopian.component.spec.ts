import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EthiopianComponent } from './ethiopian.component';

describe('EthiopianComponent', () => {
  let component: EthiopianComponent;
  let fixture: ComponentFixture<EthiopianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EthiopianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EthiopianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
