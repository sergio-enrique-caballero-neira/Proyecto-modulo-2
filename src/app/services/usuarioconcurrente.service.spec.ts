import { TestBed } from '@angular/core/testing';

import { UsuarioconcurrenteService } from './usuarioconcurrente.service';

describe('UsuarioconcurrenteService', () => {
  let service: UsuarioconcurrenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioconcurrenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
