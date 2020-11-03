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
  flagSubmit = false;
  resultado: boolean;
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
        console.log(res);
        const parsedRes: any = JSON.parse(JSON.stringify(res));
        console.log('With Parsed JSON :' , parsedRes);
        this.dataAhorcado.palabraAAdivinar = parsedRes.value;
        this.ahorcadoForm.patchValue({
          palabraAAdivinar: res,
        });
      }
    });
  }
  checkResultado(): void { // palabraIntento: string
    this.resultado = this.ahorcadoForm.value.palabraAAdivinar === this.ahorcadoForm.value.palabraIntento;
    this.flagSubmit = true;
  }
  // onSubmit(){

  // }

}
