import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZambiaComponent } from './zambia.component';

describe('ZambiaComponent', () => {
  let component: ZambiaComponent;
  let fixture: ComponentFixture<ZambiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZambiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZambiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
