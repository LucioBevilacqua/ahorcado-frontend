import { TestBed } from '@angular/core/testing';

import { AhorcadoService } from './ahorcado.service';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 

describe('AhorcadoService', () => {
  let service: AhorcadoService;

  beforeEach(() => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(AhorcadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
