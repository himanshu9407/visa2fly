import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bResponseComponent } from './b2b-response.component';

describe('B2bResponseComponent', () => {
  let component: B2bResponseComponent;
  let fixture: ComponentFixture<B2bResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
