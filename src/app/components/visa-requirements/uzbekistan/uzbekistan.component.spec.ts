import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UzbekistanComponent } from './uzbekistan.component';

describe('UzbekistanComponent', () => {
  let component: UzbekistanComponent;
  let fixture: ComponentFixture<UzbekistanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UzbekistanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UzbekistanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
