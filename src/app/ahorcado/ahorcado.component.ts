import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ahorcado } from '../model/ahorcado';
import { AhorcadoService } from '../services/ahorcado.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  flagSubmit: Boolean = false;
  resultado: Boolean;
  ahorcadoForm: FormGroup; 
  dataAhorcado : Ahorcado = { 
    palabraAAdivinar : ''
  } ;

  constructor( 
    private ahorcadoService : AhorcadoService
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.getPalabra();
  }

  initForm(){
    this.ahorcadoForm = new FormGroup({   
      palabraIntento: new FormControl('', [Validators.required]),  
      palabraAAdivinar: new FormControl('', [Validators.required]),  
    }); 
  }

  getPalabra(){
    this.ahorcadoService.getPalabra().subscribe({
      next: res =>{ 
        this.dataAhorcado = res[0]; 
        this.ahorcadoForm.patchValue({ 
          palabraAAdivinar: res[0].palabra,
        })
      }
    });
  }
  checkResultado(){ //palabraIntento: string 
    this.resultado = this.ahorcadoForm.value.palabraAAdivinar === this.ahorcadoForm.value.palabraIntento; 
    this.flagSubmit = true;
  } 
  // onSubmit(){
    
  // }
  
}
