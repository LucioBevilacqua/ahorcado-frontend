import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoPalabraComponent } from './ahorcado-palabra.component';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('AhorcadoPalabraComponent', () => {
  let component: AhorcadoPalabraComponent;
  let fixture: ComponentFixture<AhorcadoPalabraComponent>;

  beforeEach(async () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    await TestBed.configureTestingModule({
      declarations: [AhorcadoPalabraComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorcadoPalabraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
