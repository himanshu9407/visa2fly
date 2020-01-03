import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bReqComponent } from './b2b-req.component';

describe('B2bReqComponent', () => {
  let component: B2bReqComponent;
  let fixture: ComponentFixture<B2bReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
