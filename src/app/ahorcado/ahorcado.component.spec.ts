import { ComponentFixture, TestBed, async, inject, waitForAsync } from '@angular/core/testing';

import { AhorcadoComponent } from './ahorcado.component';
import { AhorcadoLetraComponent } from './ahorcado-letra/ahorcado-letra.component';
import { AhorcadoPalabraComponent } from './ahorcado-palabra/ahorcado-palabra.component';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AhorcadoService } from '../services/ahorcado.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { of } from 'rxjs';
import { Resultado } from '../model/ahorcado';

describe('AhorcadoComponent', () => {
  let component: AhorcadoComponent;
  let componentAhorcadoLetra: AhorcadoLetraComponent;
  // let componentAhorcadoPalabra: AhorcadoPalabraComponent;
  let fixture: ComponentFixture<AhorcadoComponent>;
  let fixturePorLetra: ComponentFixture<AhorcadoLetraComponent>;
  let ahorcadoService: AhorcadoService;

  beforeEach(async () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    await TestBed.configureTestingModule({
      declarations: [AhorcadoComponent],
      imports: [HttpClientTestingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        HttpClientModule,
        MatFormFieldModule,
        MatGridListModule,
        MatChipsModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatButtonToggleModule
      ],
      providers: [AhorcadoService]
    }).compileComponents();

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    ahorcadoService = TestBed.inject(AhorcadoService);

  });


  beforeEach(() => {
    fixture = TestBed.createComponent(AhorcadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fixturePorLetra = TestBed.createComponent(AhorcadoLetraComponent);
    componentAhorcadoLetra = fixturePorLetra.componentInstance;
    fixturePorLetra.detectChanges();
  });


  it('Debería crear el componente ahorcado', () => {
    expect(component).toBeTruthy();
  });
  it('Debería crear el componente Ahorcado letra', () => {
    expect(componentAhorcadoLetra).toBeTruthy();
  });

  ////////////////////////////////////////////////////////
  ///////////////////// Unit tests/////////////////////////
  ////////////////////////////////////////////////////////

  it('Deberia setear tipo juego "por palabra completa"', () => {
    component.setTipoJuego('1');
    const tipoJuego = component.esPorPalabraCompleta();
    expect(tipoJuego).toBeTrue();
  });
  it('Deberia setear tipo juego "por letra"', () => {
    component.setTipoJuego('2');
    const tipoJuego = component.esPorLetra();
    expect(tipoJuego).toBeTrue();
  });


  ////////////////////////////////////////////////////////
  /////////////////// Integration tests////////////////////
  ////////////////////////////////////////////////////////
  it('debería generar un nuevo juego usando subscribe', () => {
    ahorcadoService.iniciarJuego().subscribe({
      next: res => {
        console.log('entro al subscribe');
        expect(res).not.toBeNull();
      }
    });
  });
  it('debería generar un nuevo juego llamando a funcion', waitForAsync(() => {
    component.iniciarJuego();
    expect(component.intentosRestantes).toEqual(4);
    expect(component.palabraAAdivinar).not.toBeUndefined();
    expect(component.letrasCorrectas).toEqual([]);
    console.log(' .palabraAAdivinar', component.palabraAAdivinar);

  }));
});




