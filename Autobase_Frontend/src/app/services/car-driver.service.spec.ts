import { TestBed } from '@angular/core/testing';

import { CarDriverService } from './car-driver.service';

describe('CarDriverService', () => {
  let service: CarDriverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarDriverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
