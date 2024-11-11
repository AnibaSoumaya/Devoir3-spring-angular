import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { chaussureGuard } from './chaussure.guard';

describe('chaussureGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => chaussureGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
