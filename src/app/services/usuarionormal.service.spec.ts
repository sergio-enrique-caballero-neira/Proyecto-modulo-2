import { TestBed } from '@angular/core/testing';

import { UsuarionormalService } from './usuarionormal.service';

describe('UsuarionormalService', () => {
  let service: UsuarionormalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarionormalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
