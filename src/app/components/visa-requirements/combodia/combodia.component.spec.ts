import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombodiaComponent } from './combodia.component';

describe('CombodiaComponent', () => {
  let component: CombodiaComponent;
  let fixture: ComponentFixture<CombodiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombodiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombodiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
