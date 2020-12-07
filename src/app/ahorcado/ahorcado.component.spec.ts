import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoComponent } from './ahorcado.component';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('AhorcadoComponent', () => {
  let component: AhorcadoComponent;
  let fixture: ComponentFixture<AhorcadoComponent>;

  beforeEach(async () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    await TestBed.configureTestingModule({
      declarations: [AhorcadoComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorcadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería generar la palabra a Adivinar', () => {
    const palabra = component.getPalabra();
    console.log(component.palabraAAdivinar);
    component.palabraoculta = component.palabraAAdivinar;
    expect(palabra).not.toBeNull();
  });

  it('debería generar un nuevo juego', () => {
    component.getPalabra();
    console.log(component.palabraAAdivinar);

    expect(component.intentosRestantes).toEqual(4);
    expect(component.palabraAAdivinar).not.toBeUndefined();
    component.palabraoculta = component.palabraAAdivinar;
    expect(component.letrasCorrectas).toEqual([]);
    const cantidaddeletrasiguales = (component.palabraoculta.length === component.palabraAAdivinar.length);
    expect(cantidaddeletrasiguales).toBeTrue();
    console.log(cantidaddeletrasiguales);
    // expect(component.intentosRestantes).toEqual([]);

  });

});
