import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bFooterComponent } from './b2b-footer.component';

describe('B2bFooterComponent', () => {
  let component: B2bFooterComponent;
  let fixture: ComponentFixture<B2bFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ B2bFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
