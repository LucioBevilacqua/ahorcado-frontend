import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ahorcado, PalabraInput, Resultado } from '../../model/ahorcado';
import { AhorcadoService } from '../../services/ahorcado.service';

@Component({
  selector: 'app-ahorcado-palabra',
  templateUrl: './ahorcado-palabra.component.html',
  styleUrls: ['./ahorcado-palabra.component.css']
})
export class AhorcadoPalabraComponent implements OnInit {

  flagSubmit = false;
  resultado: Resultado =  {
    Success : false,
    Value : '',
    Info : '',
};
  ahorcadoForm: FormGroup;
  dataAhorcado: Ahorcado = {
    palabraAAdivinar: ''
  };

  constructor(
    private ahorcadoService: AhorcadoService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getPalabra();
  }

  initForm(): void {
    this.ahorcadoForm = new FormGroup({
      palabraIntento: new FormControl('', [Validators.required]),
      palabraAAdivinar: new FormControl('', [Validators.required]),
    });
  }

  getPalabra(): void {
    this.ahorcadoService.getPalabra().subscribe({
      next: res => { 
        const parsedRes: any = JSON.parse(JSON.stringify(res)); 
        console.log('parsedRes',parsedRes); 
        this.ahorcadoForm.patchValue({
          palabraAAdivinar: res,
        });
      } 
    });
  }
  arriesgaPalabra(): void { 
    this.ahorcadoService.arriesgaPalabra(  
        this.ahorcadoForm.value.palabraIntento
      ).subscribe({
        next: res => { 
          console.log(JSON.parse(JSON.stringify(res)));
          console.log(res);
          this.resultado=res;
          
          // const parsedRes: any = JSON.parse(JSON.stringify(res)); 

          // console.log('parsedRes',parsedRes); 
        } 
      });
  }
  // checkResultado(): void { // palabraIntento: string
  //   this.resultado = this.ahorcadoForm.value.palabraAAdivinar.Value === this.ahorcadoForm.value.palabraIntento;
  //   this.flagSubmit = true;
  // }
  recargaJuego(){ 
    console.log('recarga');
    this.getPalabra();
    this.limpiaMensajes();
  }

  limpiaMensajes(){
    this.resultado = {Value:'', Info:'', Success: false};
  }
}
