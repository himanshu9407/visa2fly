import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RwandaComponent } from './rwanda.component';

describe('RwandaComponent', () => {
  let component: RwandaComponent;
  let fixture: ComponentFixture<RwandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RwandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RwandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
