import { TestBed } from '@angular/core/testing';

import { VisaRequirementService } from './visa-requirement.service';

describe('VisaRequirementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisaRequirementService = TestBed.get(VisaRequirementService);
    expect(service).toBeTruthy();
  });
});
