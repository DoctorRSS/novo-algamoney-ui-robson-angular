
import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { MoneyHttpInterceptor } from './../seguranca/money-http-interceptor';
import * as moment from 'moment';

@Injectable()
export class DashboardService {

  lancamentosUrl: string;

  //constructor(private http: HttpClient) {
  constructor(private http: MoneyHttpInterceptor) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-categoria`)
        .toPromise();
        //.then(response => response as Array<any>);
  }

  lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response;
        this.converterStringsParaDatas(dados);

        return dados;
      });
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
