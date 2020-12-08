import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ahorcado, Resultado } from '../model/ahorcado';
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
  ahorcadoForm: FormGroup;
  palabraAAdivinar = '';
  letrasCorrectas: string[] = [];
  letrasIncorrectas: string[] = [];
  intentosRestantes = 4;
  URL_IMAGENES_PRE = 'assets/';
  URL_IMAGENES_EXT = '.jpg';
  // URL imagen cambiante durante los fallos en el juego
  vidaImagen: string = this.URL_IMAGENES_PRE + 'ahorcadoinicial' + this.URL_IMAGENES_EXT;
  palabraoculta: string;
  // cantidadVidas = 4;
  flagSubmitChange = 0;
  flagMostrarPalabra = false;

  resultado: Resultado = {
    Success: false,
    Value: '',
    Info: '',
  };
  constructor(
    private ahorcadoService: AhorcadoService
  ) { }

  ngOnInit(): void {
    this.flagTipoJuego = tipoJuego.PorLetra;
    this.getPalabra();
  }

  getPalabra(): void {
    console.log('getpalabra');
    this.ahorcadoService.getPalabra().subscribe({
      next: res => {
        const parsedRes: any = JSON.parse(JSON.stringify(res));
        this.palabraAAdivinar = parsedRes.Value;
      }
    });
  }

  ngOnChanges(): void {
    // console.log('ngOnChanges');
    this.getEstadoJuego();
  }

  onDataChange(event): void {
    console.log('onDataChange');
    this.flagSubmitChange += event;
    this.getEstadoJuego();
    this.getLetrasIncorrectas();
    this.getLetrasCorrectas();
    this.getIntentosRestantes(); 
  }

  getEstadoJuego(): void {
    // console.log('GetEstadoJuego');
    this.ahorcadoService.getEstadoJuego().subscribe({
      next: res => {
        this.resultado = res;
        this.vidas();
      }
    });
  }
  setTipoJuego(event): void {
    // console.log('se cambia tipo juego', event);
    this.flagTipoJuego = parseInt(event, 10);
  }
  tituloTipoJuego(): string {
    return this.flagTipoJuego === tipoJuego.PorLetra ? 'Por letra'
      : this.flagTipoJuego === tipoJuego.PorPalabraCompleta ? 'Por palabra completa'
        : 'Multijugador';
  }
  esPorLetra(): boolean {
    // console.log('esPorLetra',this.flagTipoJuego === tipoJuego.PorLetra ? true : false);
    return this.flagTipoJuego === tipoJuego.PorLetra;
  }
  esPorPalabraCompleta(): boolean {
    // console.log('esPorPalabraCompleta',this.flagTipoJuego === tipoJuego.PorPalabraCompleta ? true : false);
    return this.flagTipoJuego === tipoJuego.PorPalabraCompleta;
  }

  recargaJuego(): void {
    // console.log('recarga');
    this.getPalabra();
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
        // console.log('getIntentosRestantes');
        // console.log(res);
        this.intentosRestantes = res;
        this.vidas();
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
          this.vidaImagen = this.URL_IMAGENES_PRE + 'ahorcadocompleto' + this.URL_IMAGENES_EXT;
          // this.gameOver();
          break;
      }
    }
    else if (this.flagTipoJuego === tipoJuego.PorPalabraCompleta && this.resultado.Value === 'Perdiste!') {
      this.vidaImagen = this.URL_IMAGENES_PRE + 'ahorcadocompleto' + this.URL_IMAGENES_EXT;
      // console.log(this.vidaImagen);
    }
  }

}
