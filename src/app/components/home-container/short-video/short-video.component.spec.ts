import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortVideoComponent } from './short-video.component';

describe('ShortVideoComponent', () => {
  let component: ShortVideoComponent;
  let fixture: ComponentFixture<ShortVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
