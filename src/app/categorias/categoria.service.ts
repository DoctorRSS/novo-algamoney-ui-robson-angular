//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MoneyHttpInterceptor } from '../seguranca/money-http-interceptor';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl: string;

 // constructor(private http: HttpClient) {
  constructor(private http: MoneyHttpInterceptor) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
   }

listarTodas(): Promise<any> {
  return this.http.get(this.categoriasUrl)
  .toPromise();
  //.then(response => {
  //return response;
  //});
  }

}
