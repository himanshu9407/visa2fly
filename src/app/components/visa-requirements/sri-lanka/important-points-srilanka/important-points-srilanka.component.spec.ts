import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsSrilankaComponent } from './important-points-srilanka.component';

describe('ImportantPointsSrilankaComponent', () => {
  let component: ImportantPointsSrilankaComponent;
  let fixture: ComponentFixture<ImportantPointsSrilankaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsSrilankaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsSrilankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
