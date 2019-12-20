import { TestBed } from '@angular/core/testing';

import { AsignacionService } from './asignacion.service';

describe('AsignacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsignacionService = TestBed.get(AsignacionService);
    expect(service).toBeTruthy();
  });
});
