import { TestBed } from '@angular/core/testing';

import { HomeFormResolver } from './home-form-resolver.service';

describe('HomeFormResolver', () => {
  let service: HomeFormResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeFormResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
