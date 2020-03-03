import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AzerbaijanComponent } from './azerbaijan.component';

describe('AzerbaijanComponent', () => {
  let component: AzerbaijanComponent;
  let fixture: ComponentFixture<AzerbaijanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AzerbaijanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AzerbaijanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
