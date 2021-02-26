import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoniaComponent } from './estonia.component';

describe('EstoniaComponent', () => {
  let component: EstoniaComponent;
  let fixture: ComponentFixture<EstoniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
