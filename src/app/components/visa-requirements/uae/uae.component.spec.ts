import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UAEComponent } from './uae.component';

describe('UAEComponent', () => {
  let component: UAEComponent;
  let fixture: ComponentFixture<UAEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UAEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UAEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
