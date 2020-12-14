import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PalabraInput, Resultado } from '../model/ahorcado';

@Injectable({
  providedIn: 'root'
})

export class AhorcadoService {

  // private baseUrl = 'http://localhost:5000/api/Ahorcado/';
  // private baseUrl = 'https://localhost:44365/api/Ahorcado/';
  private baseUrl = 'https://ahorcadoapi2.azurewebsites.net/api/Ahorcado/';

  constructor(private http: HttpClient) { }

  /// Trae la palabra inicial para comenzar el juego
  iniciarJuego(): Observable<object> {
    console.log('iniciarJuego');
    return this.http.get(this.baseUrl + 'inicio', { responseType: 'json' });
  }
  /// Arriesga la palabra ingresada por el usuario
  arriesgaPalabra(palabraArriesgada: PalabraInput): Observable<Resultado> {
    const body: any = {
      Palabra: palabraArriesgada
    };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Resultado>(
      this.baseUrl + 'arriesgaPalabra'
      , body
      , httpOptions
    );
  }

  /// Arriesga una letra ingresada por el usuario para verificar si existe en la palabra a adivinar
  arriesgaLetra(letra: string): Observable<Resultado> {
    const body: any = {
      Letra: letra
    };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Resultado>(
      this.baseUrl + 'arriesgaLetra'
      , body
      , httpOptions
    );
  }

  getEstadoJuego(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'estado', { responseType: 'json' });
  }
  getLetrasIncorrectas(): Observable<any> {
    return this.http.get(this.baseUrl + 'letrasIncorrectas', { responseType: 'json' });
  }
  getLetrasCorrectas(): Observable<any> {
    return this.http.get(this.baseUrl + 'letrasCorrectas', { responseType: 'json' });
  }
  getIntentosRestantes(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'intentosRestantes', { responseType: 'json' });
  }

}
