import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiguaComponent } from './antigua.component';

describe('AntiguaComponent', () => {
  let component: AntiguaComponent;
  let fixture: ComponentFixture<AntiguaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntiguaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntiguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
