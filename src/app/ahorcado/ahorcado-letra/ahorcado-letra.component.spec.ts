import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoLetraComponent } from './ahorcado-letra.component';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('AhorcadoLetraComponent', () => {
  let component: AhorcadoLetraComponent;
  let fixture: ComponentFixture<AhorcadoLetraComponent>;

  beforeEach(async () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    await TestBed.configureTestingModule({
      declarations: [AhorcadoLetraComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorcadoLetraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 
});
