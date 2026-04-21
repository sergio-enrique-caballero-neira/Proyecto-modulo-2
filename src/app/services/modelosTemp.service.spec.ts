import { TestBed } from '@angular/core/testing';

import { ModelosTempService } from './modelosTemp.service';

describe('ModelosTempService', () => {
  let service: ModelosTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelosTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
