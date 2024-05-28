import { TestBed } from '@angular/core/testing';

import { BarcosService } from './barcos.service';

describe('BarcosService', () => {
  let service: BarcosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarcosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
