import { Component, OnInit } from '@angular/core';
import { AhorcadoService } from 'src/app/services/ahorcado.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  letrasCorrectas: String[] = [];
  letrasIncorrectas: String[] = [];

  constructor(
    private ahorcadoService: AhorcadoService
    ) { }

  ngOnInit(): void {
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
}
