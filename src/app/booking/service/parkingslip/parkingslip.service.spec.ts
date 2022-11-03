import { TestBed } from '@angular/core/testing';

import { ParkingslipService } from './parkingslip.service';

describe('ParkingslipService', () => {
  let service: ParkingslipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingslipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
