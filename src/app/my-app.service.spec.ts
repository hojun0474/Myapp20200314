/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyAppService } from './my-app.service';

describe('Service: MyApp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyAppService]
    });
  });

  it('should ...', inject([MyAppService], (service: MyAppService) => {
    expect(service).toBeTruthy();
  }));
});
