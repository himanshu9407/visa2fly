import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AustriaComponent } from './austria.component';

describe('AustriaComponent', () => {
  let component: AustriaComponent;
  let fixture: ComponentFixture<AustriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AustriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AustriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
