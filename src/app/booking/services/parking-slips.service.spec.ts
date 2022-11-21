import { TestBed } from '@angular/core/testing';

import { ParkingSlipsService } from './parking-slips.service';

describe('ParkingSlipsService', () => {
  let service: ParkingSlipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingSlipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
