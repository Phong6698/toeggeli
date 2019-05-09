import { TestBed } from '@angular/core/testing';

import { SpaceService } from './space.service';

describe('SpaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpaceService = TestBed.get(SpaceService);
    expect(service).toBeTruthy();
  });
});
