import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaltaComponent } from './malta.component';

describe('MaltaComponent', () => {
  let component: MaltaComponent;
  let fixture: ComponentFixture<MaltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
