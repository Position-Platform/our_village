import { TestBed } from '@angular/core/testing';

import { HttpBaseHeaderInterceptor } from './http-base-header.interceptor';

describe('HttpBaseHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpBaseHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpBaseHeaderInterceptor = TestBed.inject(HttpBaseHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
