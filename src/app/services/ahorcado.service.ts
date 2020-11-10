import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PalabraInput } from '../model/ahorcado';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {

  private baseUrl = 'https://localhost:44365/api/Ahorcado/';

  constructor(private http: HttpClient) { }

  /// Trae la palabra inicial para comenzar el juego
  getPalabra(): Observable<object> {
    return this.http.get(this.baseUrl + 'inicio', { responseType: 'json' }); 
  }
  /// Arriesga la palabra ingresada por el usuario
  arriesgaPalabra(request: PalabraInput): Observable<any> {
    let body = JSON.stringify(request);
    // const httpOptions = {
    //   headers: new HttpHeaders({'Content-Type': 'application/json'})
    // }
    // console.log('request', request );
    // console.log('bdy sa' ,body );

    let bodyy: any = {
      Palabra: request
    }
    console.log('bodyy' ,bodyy );
    console.log('JSON.stringify(bodyy)' ,JSON.stringify(bodyy) );  
 


    return this.http.post<any>(
      this.baseUrl + 'arriesgaPalabra'
      , JSON.stringify(bodyy) 
      // , httpOptions
    ); 
  } 

  /// Arriesga una letra ingresada por el usuario para verificar si existe en la palabra a adivinar
  arriesgaLetra(letra: string): Observable<object> {
    let params: any = { string: letra  }
    //return this.http.post(this.baseUrl + 'inicio', { responseType: 'json' });
    return of([
      {"palabra": "Automovil" }
    ]);
  }



  // isValid(): Observable<any[]>{   //todo
  // return this.httpClient.get<Ahorcado[]>(this.baseUrl);
  // }
}


