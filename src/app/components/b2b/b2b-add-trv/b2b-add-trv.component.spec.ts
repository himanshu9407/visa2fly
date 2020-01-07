import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bAddTrvComponent } from './b2b-add-trv.component';

describe('B2bAddTrvComponent', () => {
  let component: B2bAddTrvComponent;
  let fixture: ComponentFixture<B2bAddTrvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bAddTrvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bAddTrvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
