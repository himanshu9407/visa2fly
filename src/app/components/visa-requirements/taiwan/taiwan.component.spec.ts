import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiwanComponent } from './taiwan.component';

describe('TaiwanComponent', () => {
  let component: TaiwanComponent;
  let fixture: ComponentFixture<TaiwanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaiwanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaiwanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
