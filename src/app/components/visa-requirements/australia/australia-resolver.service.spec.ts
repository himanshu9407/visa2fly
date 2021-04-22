import { TestBed } from '@angular/core/testing';

import { AustraliaResolver } from './australia-resolver.service';

describe('AustraliaResolver', () => {
  let service: AustraliaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AustraliaResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
