import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoComponent } from './ahorcado.component';
import { AhorcadoLetraComponent } from './ahorcado-letra/ahorcado-letra.component'; 
import { AhorcadoPalabraComponent } from './ahorcado-palabra/ahorcado-palabra.component'; 
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Ahorcado } from '../model/ahorcado';

describe('AhorcadoComponent', () => {
  let component: AhorcadoComponent;
  let componentAhorcadoLetra: AhorcadoLetraComponent;
  //let componentAhorcadoPalabra: AhorcadoPalabraComponent;
  let fixture: ComponentFixture<AhorcadoComponent>;
  let fixturePorLetra: ComponentFixture<AhorcadoLetraComponent>;

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

    fixturePorLetra = TestBed.createComponent(AhorcadoLetraComponent);
    componentAhorcadoLetra = fixturePorLetra.componentInstance;
    fixturePorLetra.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(componentAhorcadoLetra).toBeTruthy();
  });

  it('debería generar la palabra a Adivinar', () => {
    const palabra = component.getPalabra();
    console.log(component.palabraAAdivinar);
    //component.palabraoculta = component.palabraAAdivinar;
    expect(palabra).not.toBeNull();
  });

  it('debería generar un nuevo juego', () => {
    component.getPalabra();
    //console.log(component.palabraAAdivinar);

    expect(component.intentosRestantes).toEqual(4);
    expect(component.palabraAAdivinar).not.toBeUndefined();
    expect(component.letrasCorrectas).toEqual([]);
    // component.palabraoculta = component.palabraAAdivinar;
    // const cantidaddeletrasiguales = (component.palabraoculta.length === component.palabraAAdivinar.length);
    // expect(cantidaddeletrasiguales).toBeTrue(); 

  }); 

  
  // it('debería ingresar una letra y validarla',() => {
  //   component.generarJuego();
    
  //   let letra = component.palabraAdivinar[0];;
  //   component.CoincideLetra(letra);

  //   let letraAdivinada = component.palabraAdivinar.includes(letra);
  //   expect(letraAdivinada).toBeTruthy();
  // })
  it('debería ingresar una letra y validarla',() => {
    componentAhorcadoLetra.initForm();
    
    componentAhorcadoLetra.ahorcadoForm.value.letraIntento = 'C';

    componentAhorcadoLetra.arriesgaLetra();
    component.getEstadoJuego();
    expect(component.resultado.Success).toBeTrue(); 
  })
  


  // arriesgaLetra(): void { 
  //   let letra: string = this.ahorcadoForm.value.letraIntento;
  //   this.ahorcadoService.arriesgaLetra(letra)
  //     .subscribe({
  //       next: res => { 
  //         this.resultado = res; 
  //         this.reload = this.reload + 1;
  //         this.flagSubmitChange.emit(this.reload );
  //       } 
  //     }); 
  // }  

});
