import { Component, Input, OnInit } from '@angular/core';
import { Resultado } from 'src/app/model/ahorcado';
import { AhorcadoService } from 'src/app/services/ahorcado.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit { 
  @Input () reload: number; 
  URL_IMAGENES_PRE = "assets/"
  URL_IMAGENES_EXT = ".jpg" 
  vidaImagen = this.URL_IMAGENES_PRE+"ahorcadoinicial"+this.URL_IMAGENES_EXT; //URL imagen cambiante durante los fallos en el juego
  palabraoculta: string;  
  cantidadVidas: number = 4; 
  letrasCorrectas: String[] = [];
  letrasIncorrectas: String[] = [];
  intentosRestantes: number = 0;
  flagSubmit = false;
  resultado: Resultado =  {
    Success : false,
    Value : '',
    Info : '',
};

  constructor(
    private ahorcadoService: AhorcadoService
    ) { }

  ngOnInit(): void {
  }


  ngOnChange(): void{ 
    this.getLetrasCorrectas();
    this.getLetrasIncorrectas();
    this.getIntentosRestantes();
  }
  vidas() {
    switch(this.intentosRestantes) {
        case 4:
          this.vidaImagen = this.URL_IMAGENES_PRE+"ahorcadoinicial"+this.URL_IMAGENES_EXT;    
        break;
        case 3:    
        this.vidaImagen = this.URL_IMAGENES_PRE+"ahorcadounfallo"+this.URL_IMAGENES_EXT;    
        break;
        case 2: 
        this.vidaImagen = this.URL_IMAGENES_PRE+"ahorcadodosfallos"+this.URL_IMAGENES_EXT;    
        break;
        case 1: 
        this.vidaImagen = this.URL_IMAGENES_PRE+"ahorcadotresfallos"+this.URL_IMAGENES_EXT;    
        break;
        case 0: 
         this.vidaImagen = this.URL_IMAGENES_PRE+"ahorcadocompleto"+this.URL_IMAGENES_EXT;    
        //this.gameOver();
        break;   
    
        }
      }



  // getPalabra(): void { 
  // }
  
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
        console.log(res);
        this.letrasCorrectas = res;
      } 
    });
  }
  getIntentosRestantes(): void {
    this.ahorcadoService.getIntentosRestantes().subscribe({
      next: res => {  
        this.intentosRestantes = res;
        this.vidas();
      } 
    });
  }
}
