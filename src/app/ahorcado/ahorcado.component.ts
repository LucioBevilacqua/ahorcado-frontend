import { Component, Input, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Resultado } from '../model/ahorcado';
import { tipoJuego } from '../model/tipoJuegoEnum';
import { AhorcadoService } from '../services/ahorcado.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit, OnChanges {
  @Input() reload: number;
  flagSubmit = false;
  flagTipoJuego: number;
  flagCanPlay = true;
  flagSubmitChange = 0;
  flagMostrarPalabra = false;
  ahorcadoForm: FormGroup;
  palabraAAdivinar = '';
  letrasCorrectas: string[] = [];
  letrasIncorrectas: string[] = [];
  palabraEnJuego: string;
  palabraEnJuegoLen: string;
  intentosRestantes = 4;
  URL_IMAGENES_PRE = 'assets/';
  URL_IMAGENES_EXT = '.png';
  // URL imagen cambiante durante los fallos en el juego
  vidaImagen: string = this.URL_IMAGENES_PRE + 'ahorcadoinicial' + this.URL_IMAGENES_EXT;
  color: ThemePalette = 'warn';
  mode: ProgressBarMode = 'determinate';
  progressBarValue = 0;
  progressBarBufferValue = 0;

  resultado: Resultado = {
    Success: false,
    Value: 'Que comience el juego!',
    Info: '',
  };
  constructor(
    private ahorcadoService: AhorcadoService
  ) { }

  ngOnInit(): void {
    this.flagTipoJuego = tipoJuego.PorLetra;
    this.iniciarJuego();
    this.progressBarBufferValue = this.intentosRestantes * 100;
  }
  iniciarJuego(): void {
    this.ahorcadoService.iniciarJuego().subscribe({
      next: res => {
        const parsedRes: any = JSON.parse(JSON.stringify(res));
        this.palabraAAdivinar = parsedRes.Value;
        this.flagCanPlay = true;
        this.getPalabraEnJuego();
      }
    });
  }
  ngOnChanges(): void {
    this.getEstadoJuego();
  }
  onDataChange(event): void {
    this.flagSubmitChange += event;
    this.getEstadoJuego();
    this.getLetrasIncorrectas();
    this.getLetrasCorrectas();
    this.getIntentosRestantes();
    this.getPalabraEnJuego();
    if (this.resultado.Value === 'Ganaste!'){
      this.flagCanPlay = false;
    }else if (this.resultado.Value === 'Perdiste!'){
      this.palabraEnJuego = this.palabraAAdivinar;
    }
  }
  getEstadoJuego(): void {
    this.ahorcadoService.getEstadoJuego().subscribe({
      next: res => {
        this.resultado = res;
        this.vidas();
      }
    });
  }
  setTipoJuego(event): void {
    this.flagTipoJuego = parseInt(event, 10);
  }
  esPorLetra(): boolean {
    return this.flagTipoJuego === tipoJuego.PorLetra;
  }
  esPorPalabraCompleta(): boolean {
    return this.flagTipoJuego === tipoJuego.PorPalabraCompleta;
  }
  recargaJuego(): void {
    this.iniciarJuego();
    this.limpiaJuego();
  }
  limpiaJuego(): void {
    this.resultado = { Value: '', Info: '', Success: false };
    this.intentosRestantes = null;
    this.letrasCorrectas = null;
    this.letrasIncorrectas = null;
    this.vidaImagen = this.URL_IMAGENES_PRE + 'ahorcadoinicial' + this.URL_IMAGENES_EXT;
  }
  setFlagMostrarPalabra(): void {
    this.flagMostrarPalabra = !this.flagMostrarPalabra;
  }
  getLetrasIncorrectas(): void {
    this.ahorcadoService.getLetrasIncorrectas().subscribe({
      next: res => {
        this.letrasIncorrectas = res;
      }
    });
  }
  getLetrasCorrectas(): void {
    this.ahorcadoService.getLetrasCorrectas().subscribe({
      next: res => {
        this.letrasCorrectas = res;
      }
    });
  }
  getIntentosRestantes(): void {
    this.ahorcadoService.getIntentosRestantes().subscribe({
      next: res => {
        this.intentosRestantes = res;
        this.progressBarValue = this.progressBarBufferValue - this.intentosRestantes;
        this.vidas();
      }
    });
  }
  getPalabraEnJuego(): void {
    this.ahorcadoService.getPalabraEnJuego().subscribe({
      next: res => {
        const parsedRes: any = JSON.parse(JSON.stringify(res));
        this.palabraEnJuego = parsedRes.Value;
        this.palabraEnJuegoLen = parsedRes.Info;
      }
    });
  }
  vidas(): void {
    if (this.flagTipoJuego === tipoJuego.PorLetra) {
      switch (this.intentosRestantes) {
        case 4:
          this.vidaImagen = this.URL_IMAGENES_PRE + 'ahorcadoinicial' + this.URL_IMAGENES_EXT;
          break;
        case 3:
          this.vidaImagen = this.URL_IMAGENES_PRE + 'ahorcadounfallo' + this.URL_IMAGENES_EXT;
          break;
        case 2:
          this.vidaImagen = this.URL_IMAGENES_PRE + 'ahorcadodosfallos' + this.URL_IMAGENES_EXT;
          break;
        case 1:
          this.vidaImagen = this.URL_IMAGENES_PRE + 'ahorcadotresfallos' + this.URL_IMAGENES_EXT;
          break;
        case 0:
          this.gameOver();
          break;
      }
    }
    else if (this.flagTipoJuego === tipoJuego.PorPalabraCompleta && this.resultado.Value === 'Perdiste!') {
      this.vidaImagen = this.URL_IMAGENES_PRE + 'ahorcadocompleto' + this.URL_IMAGENES_EXT;
      this.gameOver();
    }
  }
  gameOver(): void {
    this.flagCanPlay = false;
    this.vidaImagen = this.URL_IMAGENES_PRE + 'ahorcadocompleto' + this.URL_IMAGENES_EXT;
    this.intentosRestantes = null;
  }
}
