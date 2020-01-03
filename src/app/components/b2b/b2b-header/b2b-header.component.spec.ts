import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bHeaderComponent } from './b2b-header.component';

describe('B2bHeaderComponent', () => {
  let component: B2bHeaderComponent;
  let fixture: ComponentFixture<B2bHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
