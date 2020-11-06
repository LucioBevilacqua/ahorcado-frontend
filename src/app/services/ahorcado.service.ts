import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  private baseUrl = 'https://localhost:8080/api/Ahorcado';

  constructor(private httpClient: HttpClient) { }

  getPalabra(): Observable<any[]> { //todo  
  return this.httpClient.get<any[]>('https://localhost:44365/api/Ahorcado/inicio');
    // return of([
    //   //{"id": 1,"descripcion": "Crítica" }
    //   {"palabra": "Automovil" }
    // ]);
  }


  
  //isValid(): Observable<any[]>{   //todo
    //return this.httpClient.get<Ahorcado[]>(this.baseUrl);
  //}
}


