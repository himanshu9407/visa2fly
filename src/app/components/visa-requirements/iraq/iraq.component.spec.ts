import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IraqComponent } from './iraq.component';

describe('IraqComponent', () => {
  let component: IraqComponent;
  let fixture: ComponentFixture<IraqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IraqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IraqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
