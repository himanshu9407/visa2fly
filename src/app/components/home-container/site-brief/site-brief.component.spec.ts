import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteBriefComponent } from './site-brief.component';

describe('SiteBriefComponent', () => {
  let component: SiteBriefComponent;
  let fixture: ComponentFixture<SiteBriefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteBriefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
