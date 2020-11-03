import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  private baseUrl = 'https://d4aac039b72d.ngrok.io/api/Ahorcado/';

  constructor(private http: HttpClient) { }

  /// Trae la palabra inicial para comenzar el juego
  getPalabra(): Observable<object> {
    return this.http.get(this.baseUrl + 'inicio', { responseType: 'json' });
    /*return of([
      //{"id": 1,"descripcion": "Crítica" }
      {"palabra": "Automovil" }
    ]);*/
  }



  // isValid(): Observable<any[]>{   //todo
  // return this.httpClient.get<Ahorcado[]>(this.baseUrl);
  // }
}


