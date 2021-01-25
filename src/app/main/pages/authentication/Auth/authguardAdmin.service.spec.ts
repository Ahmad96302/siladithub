/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthguardAdminService } from './authguardAdmin.service';

describe('Service: AuthguardAdmin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthguardAdminService]
    });
  });

  it('should ...', inject([AuthguardAdminService], (service: AuthguardAdminService) => {
    expect(service).toBeTruthy();
  }));
});
