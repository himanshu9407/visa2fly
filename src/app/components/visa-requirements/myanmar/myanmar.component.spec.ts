import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyanmarComponent } from './myanmar.component';

describe('MyanmarComponent', () => {
  let component: MyanmarComponent;
  let fixture: ComponentFixture<MyanmarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyanmarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyanmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
