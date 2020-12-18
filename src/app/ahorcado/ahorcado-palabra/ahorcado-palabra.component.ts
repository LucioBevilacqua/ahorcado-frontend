import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ahorcado, PalabraInput, Resultado } from '../../model/ahorcado';
import { AhorcadoService } from '../../services/ahorcado.service';

@Component({
  selector: 'app-ahorcado-palabra',
  templateUrl: './ahorcado-palabra.component.html',
  styleUrls: ['./ahorcado-palabra.component.css']
})
export class AhorcadoPalabraComponent implements OnInit {
  @Input() flagCanPlay: boolean;
  @Output() flagSubmitChange = new EventEmitter<number>();
  reload = 0;
  // flagSubmit = false;
  resultado: Resultado = {
    Success: false,
    Value: '',
    Info: '',
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
    //  this.getPalabra();
  }

  initForm(): void {
    this.ahorcadoForm = new FormGroup({
      palabraIntento: new FormControl('', [Validators.required]),
    });
  }

  arriesgaPalabra(): void {
    this.ahorcadoService.arriesgaPalabra(
      this.ahorcadoForm.value.palabraIntento
    ).subscribe({
      next: res => {
        this.resultado = res;
        // this.ahorcadoForm.reset('');
        this.reload = this.reload + 1;
        this.flagSubmitChange.emit(this.reload);
      }
    });
  }
  onDataChange(): void {
    this.flagSubmitChange.emit(1);
  }
}
