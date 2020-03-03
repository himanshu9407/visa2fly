import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SriLankaComponent } from './sri-lanka.component';

describe('SriLankaComponent', () => {
  let component: SriLankaComponent;
  let fixture: ComponentFixture<SriLankaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SriLankaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SriLankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
