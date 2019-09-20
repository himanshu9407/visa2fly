import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationsAndReturnComponent } from './cancellations-and-return.component';

describe('CancellationsAndReturnComponent', () => {
  let component: CancellationsAndReturnComponent;
  let fixture: ComponentFixture<CancellationsAndReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancellationsAndReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationsAndReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
