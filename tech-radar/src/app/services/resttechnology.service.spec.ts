import { TestBed } from '@angular/core/testing';

import { RESTTechnologyService } from './resttechnology.service';

describe('RESTTechnologyService', () => {
  let service: RESTTechnologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RESTTechnologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
