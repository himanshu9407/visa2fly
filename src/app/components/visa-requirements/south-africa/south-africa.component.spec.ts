import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SouthAfricaComponent } from './south-africa.component';

describe('SouthAfricaComponent', () => {
  let component: SouthAfricaComponent;
  let fixture: ComponentFixture<SouthAfricaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SouthAfricaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SouthAfricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
