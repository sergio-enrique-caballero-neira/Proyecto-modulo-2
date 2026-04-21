import { TestBed } from '@angular/core/testing';

import { UsuariopremiumService } from './usuariopremium.service';

describe('UsuariopremiumService', () => {
  let service: UsuariopremiumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariopremiumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
