import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplansComponent } from './simplans.component';

describe('SimplansComponent', () => {
  let component: SimplansComponent;
  let fixture: ComponentFixture<SimplansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
