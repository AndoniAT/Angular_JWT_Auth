import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { provideHttpClient } from '@angular/common/http';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
