import { TestBed } from '@angular/core/testing';

import { B2bAddTrvService } from './b2b-add-trv.service';

describe('B2bAddTrvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: B2bAddTrvService = TestBed.get(B2bAddTrvService);
    expect(service).toBeTruthy();
  });
});
