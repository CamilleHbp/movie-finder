import { TestBed } from '@angular/core/testing';

import { MovieProviderService } from './movie-provider.service';

describe('MovieProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieProviderService = TestBed.get(MovieProviderService);
    expect(service).toBeTruthy();
  });
});
