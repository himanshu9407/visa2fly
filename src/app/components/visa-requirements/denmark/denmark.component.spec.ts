import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenmarkComponent } from './denmark.component';

describe('DenmarkComponent', () => {
  let component: DenmarkComponent;
  let fixture: ComponentFixture<DenmarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenmarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
