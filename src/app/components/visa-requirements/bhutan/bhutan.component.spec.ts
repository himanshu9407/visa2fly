import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BhutanComponent } from './bhutan.component';

describe('BhutanComponent', () => {
  let component: BhutanComponent;
  let fixture: ComponentFixture<BhutanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BhutanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BhutanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
