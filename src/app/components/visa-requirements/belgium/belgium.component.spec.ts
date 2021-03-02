import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BelgiumComponent } from './belgium.component';

describe('BelgiumComponent', () => {
  let component: BelgiumComponent;
  let fixture: ComponentFixture<BelgiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BelgiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BelgiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
