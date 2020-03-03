import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThailandComponent } from './thailand.component';

describe('ThailandComponent', () => {
  let component: ThailandComponent;
  let fixture: ComponentFixture<ThailandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThailandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThailandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
