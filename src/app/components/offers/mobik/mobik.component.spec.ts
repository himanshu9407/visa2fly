import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobikComponent } from './mobik.component';

describe('MobikComponent', () => {
  let component: MobikComponent;
  let fixture: ComponentFixture<MobikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
