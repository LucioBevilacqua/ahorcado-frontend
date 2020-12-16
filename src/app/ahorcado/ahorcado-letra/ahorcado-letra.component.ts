import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ahorcado, Resultado } from 'src/app/model/ahorcado';
import { AhorcadoService } from 'src/app/services/ahorcado.service';

@Component({
  selector: 'app-ahorcado-letra',
  templateUrl: './ahorcado-letra.component.html',
  styleUrls: ['./ahorcado-letra.component.scss']
})
export class AhorcadoLetraComponent implements OnInit {

  @Output() flagSubmitChange = new EventEmitter<number>();
  flagSubmit = false;
  ahorcadoForm: FormGroup;
  resultado: Resultado = {
    Success: false,
    Value: '',
    Info: '',
  };
  reload = 0;

  constructor(
    private ahorcadoService: AhorcadoService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.ahorcadoForm = new FormGroup({
      letraIntento: new FormControl('', [Validators.required])
    });
  }
  arriesgaLetra(): void {
    const letra: string = this.ahorcadoForm.value.letraIntento;
    this.ahorcadoService.arriesgaLetra(letra)
      .subscribe({
        next: res => {
          console.log('res', res);
          this.ahorcadoForm.reset(undefined);
          this.resultado = res;
          // this.reload = this.reload + 1;
          this.flagSubmitChange.emit(this.reload);
        }
      });
  }
  onDataChange(): void {
    this.flagSubmitChange.emit(1);
  }
}
