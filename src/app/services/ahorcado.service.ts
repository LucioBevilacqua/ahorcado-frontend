import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  private baseUrl = 'http://localhost:8080/api/ahorcado';

  constructor(private httpService: HttpClient) { }

  getPalabra(): Observable<any[]> { //todo
    //return this.httpService.get<any[]>(this.baseUrl);
    return of([
      //{"id": 1,"descripcion": "Crítica" }
      {"palabra": "Automovil" }
    ]);
  }


  
  //isValid(): Observable<any[]>{   //todo
    //return this.httpClient.get<Ahorcado[]>(this.baseUrl);
  //}
}


