import { TestBed } from '@angular/core/testing';

import { PreventAuthPageService } from './prevent-auth-page.service';

describe('PreventAuthPageService', () => {
  let service: PreventAuthPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreventAuthPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
