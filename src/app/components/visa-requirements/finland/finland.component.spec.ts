import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinlandComponent } from './finland.component';

describe('FinlandComponent', () => {
  let component: FinlandComponent;
  let fixture: ComponentFixture<FinlandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinlandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinlandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
