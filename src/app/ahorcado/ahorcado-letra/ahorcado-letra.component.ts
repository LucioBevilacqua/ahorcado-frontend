import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ahorcado, Resultado } from 'src/app/model/ahorcado';
import { AhorcadoService } from 'src/app/services/ahorcado.service';

@Component({
  selector: 'app-ahorcado-letra',
  templateUrl: './ahorcado-letra.component.html',
  styleUrls: ['./ahorcado-letra.component.scss']
})
export class AhorcadoLetraComponent implements OnInit {

  flagSubmit = false; 
  ahorcadoForm: FormGroup;
  dataAhorcado: Ahorcado = {
    palabraAAdivinar: ''
  };
  resultado: Resultado =  {
    Success : false,
    Value : '',
    Info : '',
};
  letrasArriesgadas: Array<any> = [];

  URL_IMAGENES_PRE = "assets/"
  URL_IMAGENES_EXT = ".jpg"  
  palabraoculta: string; 
  mascara;
  abecedario = [];
  cantidadVidas: number = 4;
  letrasUsadas = ""; 
  vidaImagen = this.URL_IMAGENES_PRE+"ahorcadoinicial"+this.URL_IMAGENES_EXT; //URL imagen cambiante durante los fallos en el juego
  letrasCorrectas: String[] = [];
  letrasIncorrectas: String[] = [];
  intentosRestantes: number = 0;

  constructor(
    private ahorcadoService: AhorcadoService
  ) { }

  ngOnInit(): void {
    this.initForm(); 
  }

  initForm(): void {
    this.ahorcadoForm = new FormGroup({
      letraIntento: new FormControl('', [Validators.required]) 
    } );
  } 

  arriesgaLetra(): void { 
    let letra: string = this.ahorcadoForm.value.letraIntento;
    this.ahorcadoService.arriesgaLetra(letra)
      .subscribe({
        next: res => { 
          // console.log(JSON.parse(JSON.stringify(res)));
          // console.log(res);
          this.resultado=res; 
          this.getLetrasCorrectas();
          this.getLetrasIncorrectas();
          this.getIntentosRestantes();
        } 
      });


      this.letrasArriesgadas.push(letra);
      if(letra==='a' || letra==='c' || letra==='b'){
        this.cantidadVidas = this.cantidadVidas - 1;
      }
      this.vidas();
  }  
  vidas() {
    switch(this.cantidadVidas) {
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
      } 
    });
  }
}
