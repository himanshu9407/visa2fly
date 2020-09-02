import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantPointsSouthafricaComponent } from './important-points-southafrica.component';

describe('ImportantPointsSouthafricaComponent', () => {
  let component: ImportantPointsSouthafricaComponent;
  let fixture: ComponentFixture<ImportantPointsSouthafricaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantPointsSouthafricaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantPointsSouthafricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
